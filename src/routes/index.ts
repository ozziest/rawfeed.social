import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import postService from "../services/post.service";
import { useViews } from "../helpers/useViews";
import hashtagService from "../services/hashtag.service";
import userService from "../services/user.service";
import followService from "../services/follow.service";
import { nextCursor } from "../helpers/common";

const feedViews = useViews({ prefix: "", layout: "layouts/default.ejs" });
const userViews = useViews({ prefix: "", layout: "layouts/default.ejs" });
const feedFragmentViews = useViews({
  prefix: "/posts",
  layout: "layouts/base.ejs",
});

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: [verifyToken] }, async (request, reply) => {
    if (request.mode === "root") {
      const { view } = feedViews(request, reply);

      const loggedUserId = request.loggedUser?.userId;
      let followingUserIds: string[] | undefined;

      if (loggedUserId) {
        const ids = await followService.getFollowingIds(loggedUserId);
        if (ids.length > 0) {
          followingUserIds = [...ids, loggedUserId];
        }
      }

      const [posts, report, lastMembers, bots] = await Promise.all([
        postService.getItems({ followingUserIds }),
        hashtagService.getDailyReport(),
        userService.getLastMembers(),
        userService.getLastBots(),
      ]);

      postService.incViews(posts);

      return view("feed.ejs", {
        posts,
        report,
        lastMembers,
        bots,
        nextCursor: nextCursor(posts),
        csrfToken: reply.generateCsrf(),
        canonical: "https://rawfeed.social/",
      });
    }

    const { view } = userViews(request, reply);
    const domainUser = request.domainUser!;
    const posts = await postService.getItems({
      userId: domainUser.id,
    });
    postService.incViews(posts);

    return view("index.ejs", {
      posts,
      nextCursorUserId: domainUser.id,
      nextCursor: nextCursor(posts),
      csrfToken: reply.generateCsrf(),
      title: `${domainUser.name} - ${domainUser.custom_domain}`,
      description:
        domainUser.bio ||
        `View ${domainUser.name}'s posts on Rawfeed - a chronological microblogging platform.`,
      canonical: domainUser.custom_domain
        ? `https://${domainUser.custom_domain}`
        : `https://rawfeed.social/u/${domainUser.username}`,
    });
  });

  fastify.get(
    "/feed/next/:cursor",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { cursor } = request.params as { cursor: string };
      const { view } = feedFragmentViews(request, reply);

      const loggedUserId = request.loggedUser?.userId;
      let followingUserIds: string[] | undefined;

      if (loggedUserId) {
        const ids = await followService.getFollowingIds(loggedUserId);
        if (ids.length > 0) {
          followingUserIds = [...ids, loggedUserId];
        }
      }

      const posts = await postService.getItems({ cursor, followingUserIds });
      postService.incViews(posts);

      return view("next", {
        posts,
        nextCursor: nextCursor(posts),
        userId: "",
        feedNextRoute: "/feed/next/",
      });
    },
  );
}
