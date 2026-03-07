import { FastifyInstance } from "fastify";
import { useJsxViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import blogService from "../services/blog.service";
import { BlogIndex } from "../views/blog/BlogIndex";
import { BlogPost } from "../views/blog/BlogPost";
import { NotFound } from "../views/NotFound";
import { asset } from "../helpers/asset";

const useCtx = useJsxViews();

export default async function blogRoutes(fastify: FastifyInstance) {
  // Blog index — list all posts
  fastify.get(
    "/blog",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const posts = await blogService.getAllPosts();
      return html(
        <BlogIndex
          {...base()}
          posts={posts}
          title="Blog — Rawfeed"
          description="Thoughts, guides, and updates from the Rawfeed team on open feeds, decentralisation, and the future of social."
        />,
      );
    },
  );

  // Single blog post
  fastify.get<{ Params: { slug: string } }>(
    "/blog/:slug",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const { slug } = request.params;
      const post = await blogService.getPost(slug);

      if (!post) {
        return reply.status(404).html(<NotFound asset={asset} />);
      }

      return html(
        <BlogPost
          {...base()}
          post={post}
          title={`${post.title} — Rawfeed Blog`}
          description={post.excerpt ?? ""}
        />,
      );
    },
  );
}
