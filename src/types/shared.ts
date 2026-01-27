export type SupportedLanguages = "en" | "tr";

export type RSSCategories = "tech";

export type RSSSource = {
  username: string;
  name: string;
  bio: string;
  url: string;
  category: RSSCategories;
  language: SupportedLanguages;
  updateFrequency: string; // cron expression: "*/15 * * * *"
  svg: string;
  useInDevelopment?: boolean;
};

export type RSSSourceWithUser = {
  uuid?: string;
  username: string;
  name: string;
  bio: string;
  url: string;
  category: RSSCategories;
  language: SupportedLanguages;
  updateFrequency: string; // cron expression: "*/15 * * * *"
  useInDevelopment?: boolean;
};

export type DefaultRSSFeedItem = {
  pubDate?: string;
  isoDate?: string;
};
