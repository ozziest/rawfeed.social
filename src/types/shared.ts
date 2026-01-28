export type SupportedLanguages = "en" | "tr";

export type RSSCategories = "tech" | "science" | "gaming";

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

export type LinkMap = {
  link: string;
  uniqueId: string;
  linkId?: string;
};

export type MentionMap = {
  username: string;
  id?: string;
};

export type HashtagMap = {
  cleaned: string;
  id?: string;
};

export type ContentMap = {
  content: string;
  links: LinkMap[];
  mentions: MentionMap[];
  hashtags: HashtagMap[];
};

export type DailyReportItem = {
  hashtag: string;
  total: number;
};
