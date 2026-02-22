import { Cron } from "croner";
import { redis } from "../helpers/cache";
import { logError } from "../helpers/common";
import {
  generateSitemapIndex,
  generateStaticSitemap,
  generateUsersSitemap,
  generateHashtagsSitemap,
} from "../helpers/sitemapGenerator";

const SITEMAP_TTL = 3600; // 1 hour in seconds

/**
 * Generates all sitemaps and stores them in Redis
 */
async function generateAllSitemaps(): Promise<void> {
  try {
    console.log("[Sitemap Scheduler] Generating sitemaps...");

    // Generate all sitemaps in parallel
    const [indexXml, staticXml, usersXml, hashtagsXml] = await Promise.all([
      generateSitemapIndex(),
      generateStaticSitemap(),
      generateUsersSitemap(),
      generateHashtagsSitemap(),
    ]);

    // Store in Redis with TTL
    await Promise.all([
      redis.setex("sitemap:index", SITEMAP_TTL, indexXml),
      redis.setex("sitemap:static", SITEMAP_TTL, staticXml),
      redis.setex("sitemap:users", SITEMAP_TTL, usersXml),
      redis.setex("sitemap:hashtags", SITEMAP_TTL, hashtagsXml),
    ]);

    console.log(
      "[Sitemap Scheduler] All sitemaps generated and cached successfully",
    );
  } catch (error) {
    logError(error as Error, {
      tags: { module: "sitemap", action: "generate_all" },
    });
  }
}

/**
 * Initializes the sitemap scheduler
 */
export async function initializeSitemapScheduler(): Promise<void> {
  // Generate sitemaps immediately on startup
  await generateAllSitemaps();

  // Schedule hourly regeneration
  new Cron("0 * * * *", async () => {
    await generateAllSitemaps();
  });

  console.log(
    "[Sitemap Scheduler] Scheduler initialized - running hourly at :00",
  );
}
