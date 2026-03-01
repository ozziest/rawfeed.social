import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { redis } from "../helpers/cache";
import {
  generateSitemapIndex,
  generateStaticSitemap,
  generateUsersSitemap,
  generateHashtagsSitemap,
  generateCustomDomainSitemap,
  generateBlogSitemap,
} from "../helpers/sitemapGenerator";

/**
 * Serves a sitemap from Redis cache, regenerating if missing
 */
async function serveSitemap(
  reply: FastifyReply,
  cacheKey: string,
  generator: () => Promise<string>,
): Promise<void> {
  try {
    // Try to get from cache
    let xml = await redis.get(cacheKey);

    // If not in cache, generate and store
    if (!xml) {
      console.log(`[Sitemap] Cache miss for ${cacheKey}, regenerating...`);
      xml = await generator();
      await redis.setex(cacheKey, 3600, xml); // 1 hour TTL
    }

    return reply
      .header("Content-Type", "application/xml; charset=utf-8")
      .header("Cache-Control", "public, max-age=3600")
      .send(xml);
  } catch (error) {
    console.error(`[Sitemap] Error serving ${cacheKey}:`, error);
    return reply.status(500).send({
      error: "Failed to generate sitemap",
    });
  }
}

export default async function sitemapRoutes(fastify: FastifyInstance) {
  // Sitemap index
  fastify.get(
    "/sitemap.xml",
    async (request: FastifyRequest, reply: FastifyReply) => {
      if (request.mode === "custom") {
        const protocol = request.protocol;
        const hostname = request.hostname;
        const domainUrl = `${protocol}://${hostname}`;
        const cacheKey = `sitemap:custom:${hostname}`;
        await serveSitemap(reply, cacheKey, async () =>
          generateCustomDomainSitemap(domainUrl),
        );
        return;
      }
      await serveSitemap(reply, "sitemap:index", generateSitemapIndex);
    },
  );

  // Static pages sitemap — not available on custom domains
  fastify.get(
    "/sitemap-static.xml",
    async (request: FastifyRequest, reply: FastifyReply) => {
      if (request.mode === "custom") {
        return reply.status(404).send({ error: "Not found" });
      }
      await serveSitemap(reply, "sitemap:static", generateStaticSitemap);
    },
  );

  // Users sitemap — not available on custom domains
  fastify.get(
    "/sitemap-users.xml",
    async (request: FastifyRequest, reply: FastifyReply) => {
      if (request.mode === "custom") {
        return reply.status(404).send({ error: "Not found" });
      }
      await serveSitemap(reply, "sitemap:users", generateUsersSitemap);
    },
  );

  // Hashtags sitemap — not available on custom domains
  fastify.get(
    "/sitemap-hashtags.xml",
    async (request: FastifyRequest, reply: FastifyReply) => {
      if (request.mode === "custom") {
        return reply.status(404).send({ error: "Not found" });
      }
      await serveSitemap(reply, "sitemap:hashtags", generateHashtagsSitemap);
    },
  );

  // Blog sitemap — not available on custom domains
  fastify.get(
    "/sitemap-blog.xml",
    async (request: FastifyRequest, reply: FastifyReply) => {
      if (request.mode === "custom") {
        return reply.status(404).send({ error: "Not found" });
      }
      await serveSitemap(reply, "sitemap:blog", generateBlogSitemap);
    },
  );
}
