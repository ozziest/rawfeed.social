import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { cache, redis } from "../helpers/cache";
import { sanitizeBlogHtml } from "../helpers/security";

const BLOG_DIR = path.join(process.cwd(), "blog", "posts");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TTL_SECONDS =
  process.env.NODE_ENV === "production" ? 60 * 60 * 24 * 7 : 1;

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO date string, e.g. "2026-02-01"
  author?: string;
  excerpt?: string;
}

export interface Post extends PostMeta {
  html: string;
}

/**
 * Returns all blog posts as metadata (no HTML), sorted newest-first.
 * Result is cached for 7 days.
 */
async function getAllPosts(): Promise<PostMeta[]> {
  return cache<PostMeta[]>("blog:getAllPosts", TTL_SECONDS, async () => {
    let files: string[];
    try {
      files = await fs.readdir(BLOG_DIR);
    } catch {
      return [];
    }

    const posts: PostMeta[] = [];

    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const slug = file.replace(/\.md$/, "");
      if (!SLUG_RE.test(slug)) continue;

      const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);

      posts.push({
        slug,
        title: String(data.title ?? slug),
        date: data.date
          ? new Date(data.date).toISOString().slice(0, 10)
          : "1970-01-01",
        author: data.author ? String(data.author) : undefined,
        excerpt: data.excerpt ? String(data.excerpt) : undefined,
      });
    }

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  });
}

/**
 * Returns a single blog post (including rendered HTML).
 * HTML is cached in Redis under blog:{slug}:html for 7 days.
 * Returns null if the slug is invalid or the file does not exist.
 */
async function getPost(slug: string): Promise<Post | null> {
  // Reject slugs that could be used for directory traversal or are invalid
  if (!SLUG_RE.test(slug)) return null;

  const htmlKey = `blog:${slug}:html`;
  const metaKey = `blog:${slug}:meta`;

  // Try cache first
  const [cachedHtml, cachedMeta] = await Promise.all([
    redis.get(htmlKey),
    redis.get(metaKey),
  ]);

  if (cachedHtml && cachedMeta) {
    const meta = JSON.parse(cachedMeta) as PostMeta;
    return { ...meta, html: cachedHtml };
  }

  // Read from disk — resolve and assert the path stays within BLOG_DIR
  const filePath = path.resolve(BLOG_DIR, `${slug}.md`);
  if (!filePath.startsWith(path.resolve(BLOG_DIR) + path.sep)) return null;

  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);

  const rawHtml = await marked(content, { async: true });
  const html = sanitizeBlogHtml(rawHtml);

  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    date: data.date
      ? new Date(data.date).toISOString().slice(0, 10)
      : "1970-01-01",
    author: data.author ? String(data.author) : undefined,
    excerpt: data.excerpt ? String(data.excerpt) : undefined,
  };

  // Persist to Redis
  await Promise.all([
    redis.setex(htmlKey, TTL_SECONDS, html),
    redis.setex(metaKey, TTL_SECONDS, JSON.stringify(meta)),
  ]);

  return { ...meta, html };
}

/**
 * Deletes all blog-related Redis keys. Called on server startup so stale
 * cached HTML is never served after a deployment.
 */
async function clearCache(): Promise<void> {
  let cursor = "0";
  do {
    const [nextCursor, keys] = await redis.scan(
      cursor,
      "MATCH",
      "blog:*",
      "COUNT",
      100,
    );
    cursor = nextCursor;
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } while (cursor !== "0");
}

export default { getAllPosts, getPost, clearCache };
