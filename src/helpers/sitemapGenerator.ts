import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { getKnex } from "../db/connection";
import { Users, Hashtags } from "../types/database";
import { BLOG_DIR, BLOG_SLUG_PATTERN } from "../consts";

const APP_URL = process.env.APP_URL || "https://rawfeed.social";

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

/**
 * Escapes XML special characters in URLs
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generates XML for a single URL entry
 */
function generateUrlXml(url: SitemapUrl): string {
  let xml = `  <url>\n`;
  xml += `    <loc>${escapeXml(url.loc)}</loc>\n`;
  if (url.lastmod) {
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
  }
  if (url.changefreq) {
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
  }
  if (url.priority !== undefined) {
    xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
  }
  xml += `  </url>\n`;
  return xml;
}

/**
 * Generates complete sitemap XML from URLs
 */
function generateSitemapXml(urls: SitemapUrl[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  urls.forEach((url) => {
    xml += generateUrlXml(url);
  });
  xml += `</urlset>`;
  return xml;
}

/**
 * Generates sitemap index XML
 */
function generateSitemapIndexXml(
  sitemaps: { loc: string; lastmod?: string }[],
): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  sitemaps.forEach((sitemap) => {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${escapeXml(sitemap.loc)}</loc>\n`;
    if (sitemap.lastmod) {
      xml += `    <lastmod>${sitemap.lastmod}</lastmod>\n`;
    }
    xml += `  </sitemap>\n`;
  });
  xml += `</sitemapindex>`;
  return xml;
}

/**
 * Generates sitemap for static pages
 */
export async function generateStaticSitemap(): Promise<string> {
  const now = new Date().toISOString();

  const urls: SitemapUrl[] = [
    {
      loc: APP_URL,
      changefreq: "hourly",
      priority: 1.0,
      lastmod: now,
    },
    {
      loc: `${APP_URL}/about`,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      loc: `${APP_URL}/explore/members`,
      changefreq: "daily",
      priority: 0.7,
      lastmod: now,
    },
    {
      loc: `${APP_URL}/explore/bots`,
      changefreq: "daily",
      priority: 0.6,
      lastmod: now,
    },
    {
      loc: `${APP_URL}/legal/privacy`,
      changefreq: "monthly",
      priority: 0.3,
    },
    {
      loc: `${APP_URL}/legal/terms`,
      changefreq: "monthly",
      priority: 0.3,
    },
    {
      loc: `${APP_URL}/legal/cookies`,
      changefreq: "monthly",
      priority: 0.3,
    },
    {
      loc: `${APP_URL}/legal/data-rights`,
      changefreq: "monthly",
      priority: 0.3,
    },
    {
      loc: `${APP_URL}/legal/bots`,
      changefreq: "monthly",
      priority: 0.3,
    },
    {
      loc: `${APP_URL}/legal/dmca`,
      changefreq: "monthly",
      priority: 0.3,
    },
    {
      loc: `${APP_URL}/budget`,
      changefreq: "monthly",
      priority: 0.5,
    },
  ];

  return generateSitemapXml(urls);
}

/**
 * Generates sitemap for user profiles (excluding bots)
 */
export async function generateUsersSitemap(): Promise<string> {
  const users = await getKnex()
    .table<Users>("users")
    .select("username", "updated_at")
    .whereNull("bot_type")
    .orderBy("created_at", "desc");

  const urls: SitemapUrl[] = users.map((user) => ({
    loc: `${APP_URL}/u/${user.username}`,
    lastmod: user.updated_at
      ? new Date(user.updated_at).toISOString()
      : undefined,
    changefreq: "weekly",
    priority: 0.7,
  }));

  return generateSitemapXml(urls);
}

/**
 * Generates sitemap for hashtag pages
 */
export async function generateHashtagsSitemap(): Promise<string> {
  const hashtags = await getKnex()
    .table<Hashtags>("hashtags")
    .select("hashtag", "updated_at")
    .orderBy("created_at", "desc");

  const urls: SitemapUrl[] = hashtags.map((hashtag) => ({
    loc: `${APP_URL}/tags/${encodeURIComponent(hashtag.hashtag)}`,
    lastmod: hashtag.updated_at
      ? new Date(hashtag.updated_at).toISOString()
      : undefined,
    changefreq: "daily",
    priority: 0.6,
  }));

  return generateSitemapXml(urls);
}

/**
 * Generates sitemap for blog posts
 */
export async function generateBlogSitemap(): Promise<string> {
  let files: string[];
  try {
    files = await fs.readdir(BLOG_DIR);
  } catch {
    files = [];
  }

  const urls: SitemapUrl[] = [];

  // Blog index page
  urls.push({
    loc: `${APP_URL}/blog`,
    changefreq: "weekly",
    priority: 0.7,
    lastmod: new Date().toISOString().slice(0, 10),
  });

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    if (!BLOG_SLUG_PATTERN.test(slug)) continue;

    try {
      const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      const lastmod = data.date
        ? new Date(data.date).toISOString().slice(0, 10)
        : undefined;

      urls.push({
        loc: `${APP_URL}/blog/${slug}`,
        lastmod,
        changefreq: "monthly",
        priority: 0.6,
      });
    } catch {
      // Skip unreadable files
    }
  }

  return generateSitemapXml(urls);
}

/**
 * Generates a minimal sitemap for a custom domain profile
 */
export function generateCustomDomainSitemap(domainUrl: string): string {
  const now = new Date().toISOString();
  const urls: SitemapUrl[] = [
    {
      loc: domainUrl,
      changefreq: "daily",
      priority: 1.0,
      lastmod: now,
    },
  ];
  return generateSitemapXml(urls);
}

/**
 * Generates sitemap index pointing to all sub-sitemaps
 */
export async function generateSitemapIndex(): Promise<string> {
  const now = new Date().toISOString();

  const sitemaps = [
    {
      loc: `${APP_URL}/sitemap-static.xml`,
      lastmod: now,
    },
    {
      loc: `${APP_URL}/sitemap-users.xml`,
      lastmod: now,
    },
    {
      loc: `${APP_URL}/sitemap-hashtags.xml`,
      lastmod: now,
    },
    {
      loc: `${APP_URL}/sitemap-blog.xml`,
      lastmod: now,
    },
  ];

  return generateSitemapIndexXml(sitemaps);
}
