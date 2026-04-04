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
