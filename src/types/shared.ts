export type SupportedLanguages = "en" | "tr" | "da";

export type RSSCategories =
  | "tech"
  | "science"
  | "gaming"
  | "news"
  | "blog"
  | "podcast";

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

export type RssSourceStatus = "pending" | "approved" | "rejected";

export type RssSourceRow = {
  id: string;
  submitted_by: string;
  bot_user_id: string;
  url: string;
  name: string;
  bio: string | null;
  category: string | null;
  language: string;
  update_frequency: string;
  status: RssSourceStatus;
  created_at: Date;
  updated_at: Date;
  // joined from users on bot_user_id
  username?: string;
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

export type ThemeTypes = "dark" | "light" | "system";
