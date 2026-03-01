/** @jsxImportSource @kitajs/html */
import { FastifyInstance } from "fastify";
import linkService from "../services/link.service";
import { logError } from "../helpers/common";
import { asset } from "../helpers/asset";
import { NotFound } from "../views/NotFound";

function addUtmParameters(url: string): string {
  try {
    const urlObj = new URL(url);

    if (
      urlObj.searchParams.has("utm_source") ||
      urlObj.searchParams.has("utm_medium") ||
      urlObj.searchParams.has("utm_campaign")
    ) {
      return url;
    }

    urlObj.searchParams.append("utm_source", "rawfeed.social");
    urlObj.searchParams.append("utm_medium", "redirect");

    return urlObj.toString();
  } catch {
    return url;
  }
}

export default async function redirectRoutes(fastify: FastifyInstance) {
  fastify.get("/redirect/:code", { preHandler: [] }, async (request, reply) => {
    const { code } = request.params as { code: string };

    try {
      const link = await linkService.getByCode(code);

      if (!link) {
        return reply.status(404).html(<NotFound asset={asset} />);
      }

      if (!/^https?:\/\//i.test(link.link)) {
        logError("Invalid protocol in link", {
          code,
          link: link.link,
          tags: { module: "redirect" },
        });
        return reply.status(404).html(<NotFound asset={asset} />);
      }

      await linkService.incCount(link.id);

      const urlWithUtm = addUtmParameters(link.link);
      return reply.redirect(urlWithUtm);
    } catch (error) {
      logError(error as Error, {
        code,
        tags: { module: "redirect" },
      });
      throw error;
    }
  });
}
