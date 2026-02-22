import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { redis } from "../helpers/cache";
import {
  generateSitemapIndex,
  generateStaticSitemap,
  generateUsersSitemap,
  generateHashtagsSitemap,
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
      await serveSitemap(reply, "sitemap:index", generateSitemapIndex);
    },
  );

  // Static pages sitemap
  fastify.get(
    "/sitemap-static.xml",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await serveSitemap(reply, "sitemap:static", generateStaticSitemap);
    },
  );

  // Users sitemap
  fastify.get(
    "/sitemap-users.xml",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await serveSitemap(reply, "sitemap:users", generateUsersSitemap);
    },
  );

  // Hashtags sitemap
  fastify.get(
    "/sitemap-hashtags.xml",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await serveSitemap(reply, "sitemap:hashtags", generateHashtagsSitemap);
    },
  );
}
