import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import postService from "../services/post.service";
import userService from "../services/user.service";
import { generateRSS } from "../helpers/rssGenerator";
import { CustomDomainInput, UserProfileParams } from "../helpers/dtos";
import {
  CUSTOM_DOMAIN_SCHEMA,
  USERNAME_SCHEMA,
  validate,
} from "../helpers/validations";
import { useViews } from "../helpers/useViews";
import { requireAuth } from "../middleware/requireAuth";
import { generateDomainVerificationToken } from "../helpers/security";
import dns from "dns/promises";
import { RSS_BOT_USERNAMES } from "../rssResources";
import { nextCursor } from "../helpers/common";

const views = useViews({ prefix: "user", layout: "layouts/default.ejs" });

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/user/settings",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const { view } = views(request, reply);
      const user = await userService.getById(request.loggedUser?.userId!);

      return view("settings/index", {
        user,
      });
    },
  );

  fastify.get(
    "/user/settings/domain",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const user = await userService.getById(request.loggedUser?.userId!);

      if (user?.custom_domain) {
        return reply.redirect("/user/settings/domain/verify");
      }

      const { view } = views(request, reply);
      return view("settings/domain/init", {
        csrfToken: reply.generateCsrf(),
        user: request.loggedUser,
      });
    },
  );

  fastify.post(
    "/user/settings/domain",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const { view, setValidation } = views(request, reply);

      const validation = validate(CUSTOM_DOMAIN_SCHEMA, request.body);
      if (validation.isNotValid) {
        setValidation(validation.errors);
        return reply.redirect("/user/settings/domain");
      }

      const domain = (request.body as CustomDomainInput).domain;

      const existingDomain = await userService.getByCustomDomain(domain);
      if (existingDomain) {
        setValidation({
          domain: "This domain is already in use by another account",
        });
        return reply.redirect("/user/settings/domain");
      }

      const verificationToken = generateDomainVerificationToken();
      await userService.update(request.loggedUser?.userId!, {
        custom_domain: domain,
        domain_verification_token: verificationToken,
        domain_verification_status: "pending",
        domain_verified_at: null,
      });

      return reply.redirect("/user/settings/domain");
    },
  );

  fastify.get(
    "/user/settings/domain/verify",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const user = await userService.getById(request.loggedUser?.userId!);

      if (!user?.custom_domain) {
        return reply.redirect("/user/settings/domain");
      }

      const { view } = views(request, reply);
      return view("settings/domain/verify", {
        csrfToken: reply.generateCsrf(),
        user,
      });
    },
  );

  fastify.get(
    "/user/settings/domain/remove",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const user = await userService.getById(request.loggedUser?.userId!);

      if (!user?.custom_domain) {
        return reply.redirect("/user/settings/domain");
      }

      const { view } = views(request, reply);
      return view("settings/domain/remove", {
        csrfToken: reply.generateCsrf(),
        user,
      });
    },
  );

  fastify.post(
    "/user/settings/domain/remove",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const user = await userService.getById(request.loggedUser?.userId!);
      if (!user?.custom_domain) {
        return reply.redirect("/user/settings/domain");
      }

      const { view, setValidation } = views(request, reply);

      const validation = validate(CUSTOM_DOMAIN_SCHEMA, request.body);
      if (validation.isNotValid) {
        setValidation(validation.errors);
        return reply.redirect("/user/settings/domain/remove");
      }

      if (user.custom_domain !== (request.body as CustomDomainInput).domain) {
        setValidation({
          domain:
            "Domain does not match. Please type the exact domain to confirm.",
        });
        return reply.redirect("/user/settings/domain/remove");
      }

      await userService.update(request.loggedUser?.userId!, {
        custom_domain: null,
        domain_verification_status: null,
        domain_verification_token: null,
        domain_verified_at: null,
      });

      return reply.redirect("/user/settings");
    },
  );

  fastify.post(
    "/user/settings/domain/verify",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const user = await userService.getById(request.loggedUser?.userId!);

      if (!user || !user.custom_domain || !user.domain_verification_token) {
        return reply.redirect("/user/settings/domain");
      }

      if (user.domain_verification_status === "verified") {
        return reply.redirect("/user/settings/domain/verify");
      }

      const domain = user.custom_domain;
      const expectedToken = user.domain_verification_token;

      try {
        const txtRecords = await dns.resolveTxt(`_rawfeed.${domain}`);
        const allRecords = txtRecords.flat();
        const tokenFound = allRecords.some(
          (record) => record === expectedToken,
        );

        if (tokenFound) {
          await userService.update(user.id, {
            domain_verification_status: "verified",
            domain_verified_at: new Date(),
          });
          return reply.redirect("/user/settings/domain/verify");
        }

        await userService.update(user.id, {
          domain_verification_status: "failed",
        });

        return reply.redirect("/user/settings/domain/verify");
      } catch (error) {
        await userService.update(user.id, {
          domain_verification_status: "failed",
        });

        return reply.redirect("/user/settings/domain/verify");
      }
    },
  );

  fastify.get(
    "/u/:username",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { username } = request.params as UserProfileParams;

      const validation = validate(USERNAME_SCHEMA, username);
      if (
        validation.isNotValid &&
        !RSS_BOT_USERNAMES.includes(username || "")
      ) {
        return reply.status(404).view("404");
      }

      request.profileUser = await userService.getByUsername(username as string);
      if (!request.profileUser) {
        return reply.status(404).view("404");
      }

      const posts = await postService.getItems({
        userId: request.profileUser?.id,
      });
      postService.incViews(posts);

      const { view } = views(request, reply);
      return view("profile", {
        posts,
        csrfToken: reply.generateCsrf(),
        nextCursorUserId: request.profileUser?.id,
        nextCursor: nextCursor(posts),
      });
    },
  );

  fastify.get(
    "/u/:username/rss",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { username } = request.params as UserProfileParams;

      if (!username) {
        return reply.status(404).view("404");
      }

      const validation = validate(USERNAME_SCHEMA, username);
      if (
        validation.isNotValid &&
        !RSS_BOT_USERNAMES.includes(username || "")
      ) {
        return reply.status(404).view("404");
      }

      const user = await userService.getByUsername(username);
      if (!user) {
        return reply.status(404).view("404");
      }

      const posts = await postService.getLast100ByUser(user?.id);
      const rssXml = generateRSS(user, posts);
      return reply
        .header("Content-Type", "application/rss+xml; charset=utf-8")
        .send(rssXml);
    },
  );
}
