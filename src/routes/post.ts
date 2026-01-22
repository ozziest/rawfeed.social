import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { useViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import { requireAuth } from "../middleware/requireAuth";
import { POST_SCHEMA, validate } from "../helpers/validations";
import { PostInput } from "../helpers/dtos";
import postService from "../services/post.service";

const usePostContext = (request: FastifyRequest, reply: FastifyReply) => {
  const views = useViews({ prefix: "/posts", layout: "layouts/base.ejs" });
  return views(request, reply);
};

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/posts/create",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const csrfToken = reply.generateCsrf();

      const validation = validate(POST_SCHEMA, request.body);
      if (validation.isNotValid) {
        return reply.view("/posts/create", {
          user: request.currentUser,
          formData: {},
          validation: {},
          csrfToken,
        });
      }

      const input = request.body as PostInput;
      await postService.insert(request.currentUser?.userId!, input);

      return reply.view("/posts/create", {
        user: request.currentUser,
        formData: {},
        validation: {},
        csrfToken,
      });
    },
  );
}
