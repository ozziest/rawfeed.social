import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import postService from "../services/post.service";
import { useViews } from "../helpers/useViews";
import hashtagService from "../services/hashtag.service";
import userService from "../services/user.service";

const feedViews = useViews({ prefix: "", layout: "layouts/default.ejs" });
const userViews = useViews({ prefix: "", layout: "layouts/default.ejs" });

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: [verifyToken] }, async (request, reply) => {
    if (request.mode === "root") {
      const { view } = feedViews(request, reply);

      const [posts, report, lastMembers, bots] = await Promise.all([
        postService.getItems(),
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
        csrfToken: reply.generateCsrf(),
      });
    }

    const { view } = userViews(request, reply);
    const posts = await postService.getItemsByUser(request.domainUser?.id!);
    postService.incViews(posts);

    return view("index.ejs", {
      posts,
      csrfToken: reply.generateCsrf(),
    });
  });
}
