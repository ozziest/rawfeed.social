import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import postService from "../services/post.service";
import { useViews } from "../helpers/useViews";

const feedViews = useViews({ prefix: "", layout: "layouts/default.ejs" });
const userViews = useViews({ prefix: "", layout: "layouts/default.ejs" });

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: [verifyToken] }, async (request, reply) => {
    if (request.mode === "root") {
      const { view } = feedViews(request, reply);

      const posts = await postService.getItems();
      postService.incViews(posts);

      return view("feed.ejs", {
        posts,
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
