import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { useViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import blogService from "../services/blog.service";

const useBlogContext = (request: FastifyRequest, reply: FastifyReply) => {
  const views = useViews({ prefix: "", layout: "layouts/landing.ejs" });
  return views(request, reply);
};

export default async function blogRoutes(fastify: FastifyInstance) {
  // Blog index — list all posts
  fastify.get(
    "/blog",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { view } = useBlogContext(request, reply);
      const posts = await blogService.getAllPosts();
      return view("blog/index.ejs", {
        posts,
        title: "Blog — RawFeed",
        description:
          "Thoughts, guides, and updates from the RawFeed team on open feeds, decentralisation, and the future of social.",
      });
    },
  );

  // Single blog post
  fastify.get<{ Params: { slug: string } }>(
    "/blog/:slug",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { view } = useBlogContext(request, reply);
      const { slug } = request.params;
      const post = await blogService.getPost(slug);

      if (!post) {
        reply.status(404);
        return view("404.ejs", {});
      }

      return view("blog/post.ejs", {
        post,
        title: `${post.title} — RawFeed Blog`,
        description: post.excerpt ?? "",
      });
    },
  );
}
