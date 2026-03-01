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

export type PostLinkWithLink = Selectable<PostLinks> & {
  linkDetail?: Links;
};

export type PostWithContent = Selectable<Posts> & {
  user: Selectable<Users>;
  links: PostLinkWithLink[];
  mentions: PostMentions[];
  hashtags: PostHashtags[];
};

export type FollowWithUser = Selectable<Follows> & {
  user: Selectable<Users>;
};
