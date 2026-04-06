import { Selectable } from "kysely";
import {
  Follows,
  Links,
  PostHashtags,
  PostLinks,
  PostMentions,
  Posts,
  Users,
} from "./database";

export type NotificationType =
  | "Like"
  | "Reshare"
  | "Follow"
  | "Reply"
  | "Mention";

export type NotificationFreq = "off" | "hourly" | "daily" | "weekly";

export type Notifications = {
  id: string;
  type: NotificationType;
  user_id: string;
  post_id: string | null;
  reply_id: string | null;
  count: number;
  is_read: boolean | number;
  created_at: Date | null;
  updated_at: Date | null;
};

export type NotificationTriggerUser = {
  trigger_user_id: string;
  username: string;
  name: string;
  email: string;
  bot_type: string | null;
};

export type NotificationWithTriggers = Notifications & {
  triggerUsers: NotificationTriggerUser[];
};

export type PostLikesAsGrouped = {
  post_id: string;
  count: number;
};

export type PostLinkWithLink = Selectable<PostLinks> & {
  linkDetail?: Links;
};

export type PostWithContent = Selectable<Posts> & {
  user: Selectable<Users>;
  links: PostLinkWithLink[];
  mentions: PostMentions[];
  hashtags: PostHashtags[];
  resharedPost?: PostWithContent;
  parentPost?: PostWithContent;
  userReshared?: boolean;
  likeCount: number;
  isLiked: boolean;
};

export type FollowWithUser = Selectable<Follows> & {
  user: Selectable<Users>;
};
