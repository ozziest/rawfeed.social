import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import postService from "../services/post.service";
import { useViews } from "../helpers/useViews";

const views = useViews({ prefix: "", layout: "layouts/default.ejs" });

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: [verifyToken] }, async (request, reply) => {
    const posts = await postService.getLast100();
    postService.incViews(posts);
    const { view } = views(request, reply);

    return view("index.ejs", {
      title: "rawfeed.social",
      posts,
      formData: {},
      validation: {},
      csrfToken: reply.generateCsrf(),
      user: request.currentUser,
    });
  });
}
