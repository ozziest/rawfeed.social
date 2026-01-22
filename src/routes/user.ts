import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import postService from "../services/post.service";
import userService from "../services/user.service";
import { generateRSS } from "../helpers/rssGenerator";

export default async function userRoutes(fastify: FastifyInstance) {
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
