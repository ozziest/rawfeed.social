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
  created_at: Date;
  updated_at: Date;
  // joined from users on bot_user_id
  username?: string;
};

export type RssSuggestionStatus = "pending" | "accepted" | "rejected";

export type RssSuggestionRow = {
  id: string;
  submitted_by: string;
  url: string;
  language: string;
  is_owner: boolean;
  status: RssSuggestionStatus;
  rejection_reason: string | null;
  admin_notes: string | null;
  created_at: Date;
  updated_at: Date;
  // joined from users on submitted_by
  submitter_username?: string;
  submitter_email?: string;
  submitter_name?: string | null;
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
