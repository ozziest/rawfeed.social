import { RSSSource } from "./types/shared";

export const RSS_RESOURCES: RSSSource[] = [
  {
    username: "rss_hacker_news",
    name: "Hacker News RSS",
    bio: "hnrss.org provides custom, realtime RSS feeds for Hacker News.",
    url: "https://hnrss.org/frontpage",
    category: "tech",
    language: "en",
    updateFrequency: "0 * * * *",
    svg: "/public/images/rss/rss_hacker_news.svg",
  },
  {
    username: "rss_github_blog",
    name: "GitHub Blog RSS",
    bio: "The RSS feed of the blog.",
    url: "https://github.blog/feed/",
    category: "tech",
    language: "en",
    updateFrequency: "0 * * * *",
    svg: "/public/images/rss/github.svg",
  },
  {
    username: "rss_nasa_new_releases",
    name: "NASA News Releases",
    bio: "The RSS feed with all of the recent NASA News Releases.",
    url: "https://www.nasa.gov/news-release/feed/",
    category: "science",
    language: "en",
    updateFrequency: "0 * * * *",
    svg: "/public/images/rss/nasa.svg",
  },
  {
    username: "rss_nasa_ss",
    name: "NASA Space Station",
    bio: "The RSS feed with the recent Space Station web content published across the site.",
    url: "https://www.nasa.gov/missions/station/feed/",
    category: "science",
    language: "en",
    updateFrequency: "0 * * * *",
    svg: "/public/images/rss/nasa.svg",
  },
  {
    username: "rss_nature",
    name: "Nature",
    bio: "The RSS feed of Nature.",
    url: "https://www.nature.com/nature.rss",
    category: "science",
    language: "en",
    updateFrequency: "0 * * * *",
    svg: "/public/images/rss/nature.svg",
  },
  {
    username: "rss_gamespot",
    name: "GameSpot",
    bio: "The RSS feed of GameSpot.",
    url: "https://www.gamespot.com/feeds/mashup",
    category: "gaming",
    language: "en",
    updateFrequency: "0 * * * *",
    svg: "/public/images/rss/gamespot.svg",
    useInDevelopment: true,
  },
];

export const RSS_BOT_USERNAMES: string[] = RSS_RESOURCES.map(
  (item) => item.username,
);
