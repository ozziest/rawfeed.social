import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { PostHashtags, PostLinks, PostMentions } from "../types/database";
import { ContentMap } from "../types/shared";
import { Insertable } from "kysely";
import { PostLinkWithLink } from "../types/relations";
import { loggerAll } from "../helpers/common";
import { cache } from "../helpers/cache";

const insert = async (postId: string, content: ContentMap) => {
  const promises = [
    addLinks(postId, content),
    addMentions(postId, content),
    addHashtags(postId, content),
  ];

  return await Promise.all(promises);
};

const addLinks = async (postId: string, content: ContentMap) => {
  if (content.links.length === 0) {
    return;
  }

  await getKnex()
    .table<Insertable<PostLinks>>("post_links")
    .insert(
      content.links.map((link) => {
        return {
          id: uuidv4(),
          link_id: link.linkId,
          post_id: postId,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
    );
};

const addMentions = async (postId: string, content: ContentMap) => {
  if (content.mentions.length === 0) {
    return;
  }

  await getKnex()
    .table<Insertable<PostMentions>>("post_mentions")
    .insert(
      content.mentions.map((mention) => {
        return {
          id: uuidv4(),
          post_id: postId,
          user_id: mention.id!,
          username: mention.username,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
    );
};

const addHashtags = async (postId: string, content: ContentMap) => {
  if (content.hashtags.length === 0) {
    return;
  }

  await getKnex()
    .table<Insertable<PostHashtags>>("post_hashtags")
    .insert(
      content.hashtags.map((hashtag) => {
        return {
          id: uuidv4(),
          hashtag: hashtag.cleaned,
          hashtag_id: hashtag.id!,
          post_id: postId,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
    );
};

const getDetailsByPost = async (postIds: string[]) => {
  if (postIds.length === 0) {
    return {
      links: [],
      mentions: [],
      hashtags: [],
    };
  }

  const promises = [
    cache("postDetail.services.links", 60 * 15, async () =>
      getKnex().table<PostLinks>("post_links").whereIn("post_id", postIds),
    ),
    cache("postDetail.services.mentions", 60 * 15, async () =>
      getKnex()
        .table<PostMentions>("post_mentions")
        .whereIn("post_id", postIds),
    ),
    cache("postDetail.services.hashtags", 60 * 15, async () =>
      getKnex()
        .table<PostHashtags>("post_hashtags")
        .whereIn("post_id", postIds),
    ),
  ];
  const [links, mentions, hashtags] = await Promise.all(promises);

  return {
    links: links as PostLinkWithLink[],
    mentions: mentions as PostMentions[],
    hashtags: hashtags as PostHashtags[],
  };
};

export default loggerAll(
  {
    insert,
    getDetailsByPost,
  },
  "postDetail.service",
);
