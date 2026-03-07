import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import { requireAuth } from "../middleware/requireAuth";
import userService from "../services/user.service";
import followService from "../services/follow.service";
import { useJsxViews } from "../helpers/useViews";
import { UserProfileParams } from "../helpers/dtos";
import { safeReferer } from "../helpers/security";
import { FollowActions } from "../views/partials/FollowActions";
import { FollowButton } from "../views/components/users/FollowButton";
import { UserListItems } from "../views/partials/UserListItems";
import { FollowersPage } from "../views/user/FollowersPage";
import { FollowingPage } from "../views/user/FollowingPage";
import { NotFound } from "../views/NotFound";
import { asset } from "../helpers/asset";

const useCtx = useJsxViews();

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
          const { html } = useCtx(request, reply);
          return html(
            <FollowButton
              targetUsername={targetUser.username}
              targetUserId={targetUser.id}
              isFollowing={false}
              csrfToken={reply.generateCsrf()}
            />,
          );
        }
        const referer = safeReferer(request.headers.referer, `/u/${username}`);
        return reply.redirect(referer);
      }

      await followService.followUser(followerId, targetUser.id);

      if (request.headers["hx-request"]) {
        const { html } = useCtx(request, reply);
        const [followerCount, followingCount] = await Promise.all([
          followService.getFollowerCount(targetUser.id),
          followService.getFollowingCount(targetUser.id),
        ]);
        return html(
          <FollowActions
            targetUser={targetUser}
            isFollowing={true}
            followerCount={followerCount}
            followingCount={followingCount}
            csrfToken={reply.generateCsrf()}
          />,
        );
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
        const { html } = useCtx(request, reply);
        const [followerCount, followingCount] = await Promise.all([
          followService.getFollowerCount(targetUser.id),
          followService.getFollowingCount(targetUser.id),
        ]);
        return html(
          <FollowActions
            targetUser={targetUser}
            isFollowing={false}
            followerCount={followerCount}
            followingCount={followingCount}
            csrfToken={reply.generateCsrf()}
          />,
        );
      }

      const referer = safeReferer(request.headers.referer, `/u/${username}`);
      return reply.redirect(referer);
    },
  );

  fastify.get(
    "/u/:username/followers",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const { username } = request.params as UserProfileParams;

      const profileUser = await userService.getByUsername(username!);
      if (!profileUser) {
        return reply.status(404).send(<NotFound asset={asset} />);
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

      return html(
        <FollowersPage
          {...base()}
          profileUser={profileUser}
          items={items}
          nextCursor={nextCursor}
          isFollowingMap={isFollowingMap}
          csrfToken={reply.generateCsrf()}
        />,
      );
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

      const { html } = useCtx(request, reply);
      return html(
        <UserListItems
          items={items}
          nextCursor={nextCursor}
          listRoute={`/u/${username}/followers/next/`}
          loggedUser={request.loggedUser}
          isFollowingMap={isFollowingMap}
          csrfToken={reply.generateCsrf()}
        />,
      );
    },
  );

  fastify.get(
    "/u/:username/following",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const { username } = request.params as UserProfileParams;

      const profileUser = await userService.getByUsername(username!);
      if (!profileUser) {
        return reply.status(404).send(<NotFound asset={asset} />);
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

      return html(
        <FollowingPage
          {...base()}
          profileUser={profileUser}
          items={items}
          nextCursor={nextCursor}
          isFollowingMap={isFollowingMap}
          csrfToken={reply.generateCsrf()}
        />,
      );
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

      const { html } = useCtx(request, reply);
      return html(
        <UserListItems
          items={items}
          nextCursor={nextCursor}
          listRoute={`/u/${username}/following/next/`}
          loggedUser={request.loggedUser}
          isFollowingMap={isFollowingMap}
          csrfToken={reply.generateCsrf()}
        />,
      );
    },
  );
}
