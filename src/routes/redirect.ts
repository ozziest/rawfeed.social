import { FastifyInstance } from "fastify";
import linkService from "../services/link.service";
import { logError } from "../helpers/common";

export default async function redirectRoutes(fastify: FastifyInstance) {
  fastify.get("/redirect/:code", { preHandler: [] }, async (request, reply) => {
    const { code } = request.params as { code: string };

    try {
      const link = await linkService.getByCode(code);

      if (!link) {
        return reply.status(404).view("404");
      }

      if (!/^https?:\/\//i.test(link.link)) {
        logError("Invalid protocol in link", {
          code,
          link: link.link,
          tags: { module: "redirect" },
        });
        return reply.status(404).view("404");
      }

      await linkService.incCount(link.id);

      return reply.redirect(link.link);
    } catch (error) {
      logError(error as Error, {
        code,
        tags: { module: "redirect" },
      });
      throw error;
    }
  });
}
