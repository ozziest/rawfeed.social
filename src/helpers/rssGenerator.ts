import { Users } from "../types/database";
import { PostWithContent } from "../types/relations";

export function generateRSS(user: Users, posts: PostWithContent[]): string {
  const baseUrl = process.env.BASE_URL || "https://rawfeed.social";
  const now = new Date().toUTCString();
  const lastPost = posts[0]?.created_at
    ? new Date(posts[0].created_at).toUTCString()
    : now;

  const items = posts
    .map((post) => {
      const cleanContent = post.content.replace(/\s+/g, " ").trim();
      const title =
        cleanContent.length > 100
          ? `${cleanContent.substring(0, 100)}...`
          : cleanContent;

      return `
    <item xml:lang="${post.location}">
      <title>${title}</title>
      <link>${baseUrl}/u/${user.username}/post/${post.id}</link>
      <guid>${baseUrl}/u/${user.username}/post/${post.id}</guid>
      <pubDate>${new Date(post.created_at || new Date()).toUTCString()}</pubDate>
      <author>${post.user.name}</author>
      <description>${cleanContent}</description>
      <category>${post.location}</category>
    </item>`;
    })
    .join("");

  const displayName = user.name || user.username;
  const description = user.bio || `Posts by ${displayName}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${displayName} - RawFeed</title>
    <link>${baseUrl}/u/${user.username}</link>
    <description>${description}</description>
    <language>en</language>
    <lastBuildDate>${lastPost}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${baseUrl}/u/${user.username}/rss" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
