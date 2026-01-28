import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { useViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import { requireAuth } from "../middleware/requireAuth";
import { POST_SCHEMA, validate } from "../helpers/validations";
import { PostInput } from "../helpers/dtos";
import postService from "../services/post.service";
import { nextCursor } from "../helpers/common";

const usePostContext = (request: FastifyRequest, reply: FastifyReply) => {
  const views = useViews({ prefix: "/posts", layout: "layouts/base.ejs" });
  return views(request, reply);
};

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/posts/next/:cursor/:userId",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { cursor, userId } = request.params as {
        cursor: string;
        userId?: string;
      };

      const { view } = usePostContext(request, reply);

      const posts = await postService.getItems({ cursor, userId });
      postService.incViews(posts);

      return view("next", { posts, nextCursor: nextCursor(posts), userId });
    },
  );

  fastify.post(
    "/posts/create",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const { view } = usePostContext(request, reply);
      const csrfToken = reply.generateCsrf();

      const validation = validate(POST_SCHEMA, request.body);
      if (validation.isNotValid) {
        return view("create", { csrfToken });
      }

      const input = request.body as PostInput;
      await postService.insert(request.loggedUser?.userId!, input);

      return view("create", { csrfToken });
    },
  );
}
