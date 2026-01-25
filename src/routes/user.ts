import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import postService from "../services/post.service";
import userService from "../services/user.service";
import { generateRSS } from "../helpers/rssGenerator";
import { UserProfileParams } from "../helpers/dtos";
import { USERNAME_SCHEMA, validate } from "../helpers/validations";
import { useViews } from "../helpers/useViews";

const views = useViews({ prefix: "user", layout: "layouts/default.ejs" });

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/u/:username",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { username } = request.params as UserProfileParams;

      const validation = validate(USERNAME_SCHEMA, username);
      if (validation.isNotValid) {
        return reply.status(404).view("404");
      }

      const user = await userService.getByUsername(username as string);
      if (!user) {
        return reply.status(404).view("404");
      }

      const posts = await postService.getLast100ByUser(user?.id);
      const { view } = views(request, reply);
      return view("profile", {
        posts,
        formData: {},
        validation: {},
        csrfToken: reply.generateCsrf(),
        user: request.currentUser,
      });
    },
  );

  fastify.get(
    "/u/:username/rss",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const user = await userService.getByEmail("i.ozguradem@gmail.com");
      if (!user) {
        throw new Error("User not found");
      }

      const posts = await postService.getLast100ByUser(user?.id);
      const rssXml = generateRSS(user, posts);
      return reply
        .header("Content-Type", "application/rss+xml; charset=utf-8")
        .send(rssXml);
    },
  );
}
