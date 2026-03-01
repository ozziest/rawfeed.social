import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import { requireAuth } from "../middleware/requireAuth";
import userService from "../services/user.service";
import followService from "../services/follow.service";
import { useViews } from "../helpers/useViews";
import { UserProfileParams } from "../helpers/dtos";
import { safeReferer } from "../helpers/security";

const listViews = useViews({ prefix: "user", layout: "layouts/default.ejs" });
const fragmentViews = useViews({
  prefix: "partials",
  layout: "layouts/base.ejs",
});

export default async function followRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/follow/:username",
    {
      preHandler: [fastify.csrfProtection, verifyToken, requireAuth],
      config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
    },
    async (request, reply) => {
      const { username } = request.params as UserProfileParams;
      const followerId = request.loggedUser!.userId;

      const targetUser = await userService.getByUsername(username!);
      if (!targetUser) {
        return reply.status(404).send({ error: "User not found" });
      }

      // Prevent self-follow
      if (targetUser.id === followerId) {
        if (request.headers["hx-request"]) {
          const { view } = fragmentViews(request, reply);
          return view("follow-button", {
            targetUsername: targetUser.username,
            targetUserId: targetUser.id,
            isFollowing: false,
            csrfToken: reply.generateCsrf(),
          });
        }
        const referer = safeReferer(request.headers.referer, `/u/${username}`);
        return reply.redirect(referer);
      }

      await followService.followUser(followerId, targetUser.id);

      if (request.headers["hx-request"]) {
        const { view } = fragmentViews(request, reply);
        const [followerCount, followingCount] = await Promise.all([
          followService.getFollowerCount(targetUser.id),
          followService.getFollowingCount(targetUser.id),
        ]);
        return view("follow-actions", {
          targetUser,
          isFollowing: true,
          followerCount,
          followingCount,
          csrfToken: reply.generateCsrf(),
        });
      }

      const referer = safeReferer(request.headers.referer, `/u/${username}`);
      return reply.redirect(referer);
    },
  );

  fastify.post(
    "/unfollow/:username",
    {
      preHandler: [fastify.csrfProtection, verifyToken, requireAuth],
      config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
    },
    async (request, reply) => {
      const { username } = request.params as UserProfileParams;
      const followerId = request.loggedUser!.userId;

      const targetUser = await userService.getByUsername(username!);
      if (!targetUser) {
        return reply.status(404).send({ error: "User not found" });
      }

      await followService.unfollowUser(followerId, targetUser.id);

      if (request.headers["hx-request"]) {
        const { view } = fragmentViews(request, reply);
        const [followerCount, followingCount] = await Promise.all([
          followService.getFollowerCount(targetUser.id),
          followService.getFollowingCount(targetUser.id),
        ]);
        return view("follow-actions", {
          targetUser,
          isFollowing: false,
          followerCount,
          followingCount,
          csrfToken: reply.generateCsrf(),
        });
      }

      const referer = safeReferer(request.headers.referer, `/u/${username}`);
      return reply.redirect(referer);
    },
  );

  fastify.get(
    "/u/:username/followers",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { username } = request.params as UserProfileParams;

      const profileUser = await userService.getByUsername(username!);
      if (!profileUser) {
        return reply.status(404).view("404");
      }

      request.profileUser = profileUser;

      const { items, nextCursor } = await followService.getFollowers(
        profileUser.id,
      );

      const loggedUserId = request.loggedUser?.userId;
      const isFollowingMap: Record<string, boolean> =
        loggedUserId && items.length > 0
          ? await followService.isFollowingBatch(
              loggedUserId,
              items.map((f) => f.user.id),
            )
          : {};

      const { view } = listViews(request, reply);
      return view("followers", {
        profileUser,
        items,
        nextCursor,
        isFollowingMap,
        csrfToken: reply.generateCsrf(),
      });
    },
  );

  fastify.get(
    "/u/:username/followers/next/:cursor",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { username, cursor } = request.params as {
        username: string;
        cursor: string;
      };

      const profileUser = await userService.getByUsername(username);
      if (!profileUser) {
        return reply.status(404).send("");
      }

      const { items, nextCursor } = await followService.getFollowers(
        profileUser.id,
        cursor,
      );

      const loggedUserId = request.loggedUser?.userId;
      const isFollowingMap: Record<string, boolean> =
        loggedUserId && items.length > 0
          ? await followService.isFollowingBatch(
              loggedUserId,
              items.map((f) => f.user.id),
            )
          : {};

      const { view } = fragmentViews(request, reply);
      return view("user-list-items", {
        items,
        nextCursor,
        listRoute: `/u/${username}/followers/next/`,
        loggedUser: request.loggedUser,
        isFollowingMap,
        csrfToken: reply.generateCsrf(),
      });
    },
  );

  fastify.get(
    "/u/:username/following",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { username } = request.params as UserProfileParams;

      const profileUser = await userService.getByUsername(username!);
      if (!profileUser) {
        return reply.status(404).view("404");
      }

      request.profileUser = profileUser;

      const { items, nextCursor } = await followService.getFollowing(
        profileUser.id,
      );

      const loggedUserId = request.loggedUser?.userId;
      const isFollowingMap: Record<string, boolean> =
        loggedUserId && items.length > 0
          ? await followService.isFollowingBatch(
              loggedUserId,
              items.map((f) => f.user.id),
            )
          : {};

      const { view } = listViews(request, reply);
      return view("following", {
        profileUser,
        items,
        nextCursor,
        isFollowingMap,
        csrfToken: reply.generateCsrf(),
      });
    },
  );

  fastify.get(
    "/u/:username/following/next/:cursor",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { username, cursor } = request.params as {
        username: string;
        cursor: string;
      };

      const profileUser = await userService.getByUsername(username);
      if (!profileUser) {
        return reply.status(404).send("");
      }

      const { items, nextCursor } = await followService.getFollowing(
        profileUser.id,
        cursor,
      );

      const loggedUserId = request.loggedUser?.userId;
      const isFollowingMap: Record<string, boolean> =
        loggedUserId && items.length > 0
          ? await followService.isFollowingBatch(
              loggedUserId,
              items.map((f) => f.user.id),
            )
          : {};

      const { view } = fragmentViews(request, reply);
      return view("user-list-items", {
        items,
        nextCursor,
        listRoute: `/u/${username}/following/next/`,
        loggedUser: request.loggedUser,
        isFollowingMap,
        csrfToken: reply.generateCsrf(),
      });
    },
  );
}
