import { RSSSource } from "./types/shared";

export const RSS_RESOURCES: RSSSource[] = [
  {
    username: "rss_hacker_news",
    name: "Hacker News RSS",
    bio: "hnrss.org provides custom, realtime RSS feeds for Hacker News.",
    url: "https://hnrss.org/frontpage",
    category: "tech",
    language: "en",
    updateFrequency: "0,30 * * * *",
    svg: "/public/images/rss/rss_hacker_news.svg",
  },
  {
    username: "rss_github_blog",
    name: "GitHub Blog RSS",
    bio: "The RSS feed of the blog.",
    url: "https://github.blog/feed/",
    category: "tech",
    language: "en",
    updateFrequency: "0 9 * * *",
    svg: "/public/images/rss/github.svg",
  },
];

export const RSS_BOT_USERNAMES: string[] = RSS_RESOURCES.map(
  (item) => item.username,
);
