import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import postService from "../services/post.service";
import userService from "../services/user.service";
import followService from "../services/follow.service";
import dataExportService from "../services/dataExport.service";
import s3Service from "../services/s3.service";
import { generateRSS } from "../helpers/rssGenerator";
import {
  CustomDomainInput,
  ProfileUpdateInput,
  UserProfileParams,
} from "../helpers/dtos";
import {
  CUSTOM_DOMAIN_SCHEMA,
  DEFAULT_USERNAME_SCHEMA,
  PROFILE_UPDATE_SCHEMA,
  validate,
} from "../helpers/validations";
import { useJsxViews } from "../helpers/useViews";
import { requireAuth } from "../middleware/requireAuth";
import { generateDomainVerificationToken } from "../helpers/security";
import dns from "dns/promises";
import { RSS_BOT_USERNAMES } from "../rssResources";
import { nextCursor } from "../helpers/common";
import { SettingsIndex } from "../views/user/settings/SettingsIndex";
import { SettingsProfile } from "../views/user/settings/SettingsProfile";
import { DomainInit } from "../views/user/settings/DomainInit";
import { DomainVerify } from "../views/user/settings/DomainVerify";
import { DomainRemove } from "../views/user/settings/DomainRemove";
import { DataExtraction } from "../views/user/settings/DataExtraction";
import { UserProfile } from "../views/user/UserProfile";
import { NotFound } from "../views/NotFound";

const useCtx = useJsxViews();

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/user/settings",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const user = await userService.getById(request.loggedUser?.userId!);

      return html(<SettingsIndex {...base()} user={user ?? undefined} />);
    },
  );

  fastify.get(
    "/user/settings/profile",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const user = await userService.getById(request.loggedUser?.userId!);

      return html(
        <SettingsProfile
          {...base()}
          csrfToken={reply.generateCsrf()}
          user={user ?? undefined}
        />,
      );
    },
  );

  fastify.post(
    "/user/settings/profile",
    { preHandler: [fastify.csrfProtection, verifyToken, requireAuth] },
    async (request, reply) => {
      const { setValidation } = useCtx(request, reply);

      const validation = validate(PROFILE_UPDATE_SCHEMA, request.body);
      if (validation.isNotValid) {
        setValidation(validation.errors);
        return reply.redirect("/user/settings/profile");
      }

      const input = request.body as ProfileUpdateInput;
      await userService.update(request.loggedUser?.userId!, {
        name: input.name,
        bio: input.bio,
        link: input.link || null,
      });

      return reply.redirect("/user/settings");
    },
  );

  fastify.get(
    "/user/settings/domain",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const user = await userService.getById(request.loggedUser?.userId!);

      if (user?.custom_domain) {
        return reply.redirect("/user/settings/domain/verify");
      }

      return html(
        <DomainInit
          {...base()}
          csrfToken={reply.generateCsrf()}
          user={request.loggedUser}
        />,
      );
    },
  );

  fastify.post(
    "/user/settings/domain",
    { preHandler: [fastify.csrfProtection, verifyToken, requireAuth] },
    async (request, reply) => {
      const { setValidation } = useCtx(request, reply);

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
      const { html, base } = useCtx(request, reply);
      const user = await userService.getById(request.loggedUser?.userId!);

      if (!user?.custom_domain) {
        return reply.redirect("/user/settings/domain");
      }

      return html(
        <DomainVerify
          {...base()}
          csrfToken={reply.generateCsrf()}
          user={user}
        />,
      );
    },
  );

  fastify.get(
    "/user/settings/domain/remove",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const user = await userService.getById(request.loggedUser?.userId!);

      if (!user?.custom_domain) {
        return reply.redirect("/user/settings/domain");
      }

      return html(
        <DomainRemove
          {...base()}
          csrfToken={reply.generateCsrf()}
          user={user}
        />,
      );
    },
  );

  fastify.post(
    "/user/settings/domain/remove",
    { preHandler: [fastify.csrfProtection, verifyToken, requireAuth] },
    async (request, reply) => {
      const { setValidation } = useCtx(request, reply);

      const user = await userService.getById(request.loggedUser?.userId!);
      if (!user?.custom_domain) {
        return reply.redirect("/user/settings/domain");
      }

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
    { preHandler: [fastify.csrfProtection, verifyToken, requireAuth] },
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
      } catch {
        await userService.update(user.id, {
          domain_verification_status: "failed",
        });

        return reply.redirect("/user/settings/domain/verify");
      }
    },
  );

  fastify.get(
    "/user/settings/data-extraction",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const userId = request.loggedUser?.userId!;

      const exports = await dataExportService.getByUserId(userId, 10);
      const canRequest = await dataExportService.canUserRequestExport(userId);

      return html(
        <DataExtraction
          {...base()}
          csrfToken={reply.generateCsrf()}
          exports={exports}
          canRequest={canRequest}
        />,
      );
    },
  );

  fastify.post(
    "/user/settings/data-extraction/request",
    { preHandler: [fastify.csrfProtection, verifyToken, requireAuth] },
    async (request, reply) => {
      const { setState } = useCtx(request, reply);
      const userId = request.loggedUser?.userId!;

      const canRequest = await dataExportService.canUserRequestExport(userId);
      if (!canRequest) {
        setState({
          error:
            "You can only request one export per week. Please try again later.",
        });
        return reply.redirect("/user/settings/data-extraction");
      }

      await dataExportService.create({ userId });

      setState({
        success:
          "Export request submitted successfully. You'll receive an email when it's ready.",
      });
      return reply.redirect("/user/settings/data-extraction");
    },
  );

  fastify.get(
    "/user/settings/data-extraction/:id/download",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const { setState } = useCtx(request, reply);
      const userId = request.loggedUser?.userId!;
      const { id } = request.params as { id: string };

      const exportRecord = await dataExportService.getById(id);

      if (!exportRecord || exportRecord.user_id !== userId) {
        setState({ error: "Export not found" });
        return reply.redirect("/user/settings/data-extraction");
      }

      if (!dataExportService.isExportValid(exportRecord)) {
        setState({ error: "Export has expired or is not yet ready" });
        return reply.redirect("/user/settings/data-extraction");
      }

      const user = await userService.getById(userId);
      const filename = `rawfeed-export-${user?.username}-${new Date().toISOString().split("T")[0]}.zip`;

      const downloadUrl = await s3Service.generatePresignedUrl(
        exportRecord.s3_key!,
        900,
        filename,
        "application/zip",
      );

      return reply.redirect(downloadUrl);
    },
  );

  fastify.get(
    "/u/:username",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const { username } = request.params as UserProfileParams;

      const validation = validate(DEFAULT_USERNAME_SCHEMA, username);
      if (
        validation.isNotValid &&
        !RSS_BOT_USERNAMES.includes(username || "")
      ) {
        return reply.status(404).html(<NotFound {...base()} />);
      }

      request.profileUser = await userService.getByUsername(username as string);
      if (!request.profileUser) {
        return reply.status(404).html(<NotFound {...base()} />);
      }

      const loggedUserId = request.loggedUser?.userId;
      const posts = await postService.getItems({
        userId: request.profileUser?.id,
        loggedUserId,
      });
      postService.incViews(posts);
      const profileUserId = request.profileUser!.id;

      const [followerCount, followingCount, isFollowingProfile] =
        await Promise.all([
          followService.getFollowerCount(profileUserId),
          followService.getFollowingCount(profileUserId),
          loggedUserId && loggedUserId !== profileUserId
            ? followService.isFollowing(loggedUserId, profileUserId)
            : Promise.resolve(false),
        ]);

      const profileUser = request.profileUser!;

      return html(
        <UserProfile
          {...base()}
          title={`${profileUser.name} (@${profileUser.username}) - Rawfeed`}
          description={
            profileUser.bio ||
            `View ${profileUser.name}'s posts on Rawfeed - a chronological microblogging platform.`
          }
          canonical={`https://rawfeed.social/u/${profileUser.username}`}
          posts={posts}
          csrfToken={reply.generateCsrf()}
          nextCursorUserId={profileUser.id}
          nextCursor={nextCursor(posts)}
          followerCount={followerCount}
          followingCount={followingCount}
          isFollowing={isFollowingProfile}
        />,
      );
    },
  );

  fastify.get(
    "/u/:username/rss",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { base } = useCtx(request, reply);
      const { username } = request.params as UserProfileParams;

      if (!username) {
        return reply.status(404).html(<NotFound {...base()} />);
      }

      const validation = validate(DEFAULT_USERNAME_SCHEMA, username);
      if (
        validation.isNotValid &&
        !RSS_BOT_USERNAMES.includes(username || "")
      ) {
        return reply.status(404).html(<NotFound {...base()} />);
      }

      const user = await userService.getByUsername(username);
      if (!user) {
        return reply.status(404).html(<NotFound {...base()} />);
      }

      const posts = await postService.getLast100ByUser(user?.id);
      const rssXml = generateRSS(user, posts);
      return reply
        .header("Content-Type", "application/rss+xml; charset=utf-8")
        .send(rssXml);
    },
  );
}
