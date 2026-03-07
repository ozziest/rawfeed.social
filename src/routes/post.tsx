import { FastifyInstance } from "fastify";
import { useJsxViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import { requireAuth } from "../middleware/requireAuth";
import { POST_SCHEMA, validate } from "../helpers/validations";
import { PostInput } from "../helpers/dtos";
import postService from "../services/post.service";
import { nextCursor } from "../helpers/common";
import { PostCreate } from "../views/posts/PostCreate";
import { PostsNext } from "../views/posts/PostsNext";

const useCtx = useJsxViews();

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/posts/next/:cursor/:userId",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { cursor, userId } = request.params as {
        cursor: string;
        userId?: string;
      };

      const { html } = useCtx(request, reply);

      const posts = await postService.getItems({ cursor, userId });
      postService.incViews(posts);

      return html(
        <PostsNext
          posts={posts}
          nextCursor={nextCursor(posts)}
          userId={userId}
        />,
      );
    },
  );

  fastify.post(
    "/posts/create",
    {
      preHandler: [fastify.csrfProtection, verifyToken, requireAuth],
    },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const csrfToken = reply.generateCsrf();

      const validation = validate(POST_SCHEMA, request.body);
      if (validation.isNotValid) {
        const b = base();
        return html(
          <PostCreate
            posts={[]}
            csrfToken={csrfToken}
            loggedUser={b.loggedUser}
            validation={b.validation}
            formData={b.state as Record<string, unknown>}
          />,
        );
      }

      const input = request.body as PostInput;
      const id = await postService.insert(request.loggedUser?.userId!, input);
      console.log("id", id);

      const posts = await postService.getItems({ id });
      const b = base();

      return html(
        <PostCreate
          posts={posts}
          csrfToken={csrfToken}
          loggedUser={b.loggedUser}
        />,
      );
    },
  );
}
