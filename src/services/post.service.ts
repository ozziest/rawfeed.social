import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { PostInput, PostQueryParams } from "../helpers/dtos";
import { Posts } from "../types/database";
import { PostWithContent } from "../types/relations";
import userService from "./user.service";
import { Selectable } from "kysely";
import contentService from "./content.service";
import postDetailService from "./postDetailService";
import linkService from "./link.service";
import { loggerAll } from "../helpers/common";
import { POST_SIZE } from "../consts";

const TABLE_NAME = "posts";

const insert = async (
  userId: string,
  input: PostInput,
  externalId?: string,
  created_at?: Date,
  parent_id?: string,
) => {
  const postId = uuidv4();
  const postContent = await contentService.toPostContent(input.content);

  await getKnex()
    .table(TABLE_NAME)
    .insert({
      id: postId,
      user_id: userId,
      parent_id: parent_id ?? null,
      content: postContent.content,
      lexical: postContent.content,
      location: input.location,
      external_id: externalId,
      created_at: created_at || new Date(),
      updated_at: new Date(),
    });

  await postDetailService.insert(postId, postContent);

  if (parent_id) {
    await getKnex()
      .table(TABLE_NAME)
      .where("id", parent_id)
      .increment("stats_replies", 1);
  }

  return postId;
};

const getItemsByUser = async (userId: string): Promise<PostWithContent[]> => {
  const posts = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .where("user_id", userId)
    .orderBy("created_at", "desc")
    .limit(100);
  return await mergeWithContent(posts);
};

const getItems = async (
  params?: PostQueryParams,
): Promise<PostWithContent[]> => {
  let query = getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .orderBy("created_at", "desc")
    .orderBy("id", "desc")
    .limit(POST_SIZE);

  if (params?.id) {
    query.where("id", params.id);
  }

  if (params?.userId) {
    query.where("user_id", params.userId);
  }

  if (params?.followingUserIds && params.followingUserIds.length > 0) {
    query = query.whereIn("user_id", params.followingUserIds);
  }

  if (params?.cursor) {
    const [timestamp, lastId] = params.cursor.split("_");
    query = query.where(function () {
      this.where("created_at", "<", timestamp).orWhere(function () {
        this.where("created_at", "=", timestamp).andWhere("id", "<", lastId);
      });
    });
  }

  const posts = await query;
  return await mergeWithContent(posts, params?.loggedUserId);
};

const getItemsByHashtag = async (
  hashtagId: string,
): Promise<PostWithContent[]> => {
  const posts = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .innerJoin("post_hashtags", "posts.id", "post_hashtags.post_id")
    .where("post_hashtags.hashtag_id", hashtagId)
    .orderBy("posts.created_at", "desc")
    .limit(100)
    .select("posts.*");

  return await mergeWithContent(posts);
};

const getLast100ByUser = async (userId: string): Promise<PostWithContent[]> => {
  const posts = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .where("user_id", userId)
    .orderBy("created_at", "desc")
    .limit(100);
  return await mergeWithContent(posts);
};

const getAllByUser = async (userId: string): Promise<PostWithContent[]> => {
  const posts = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .where("user_id", userId)
    .orderBy("created_at", "desc");
  return await mergeWithContent(posts);
};

const getById = async (
  id: string,
  loggedUserId?: string,
): Promise<PostWithContent | undefined> => {
  const post = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .where("id", id)
    .first();

  if (!post) {
    return undefined;
  }

  const [result] = await mergeWithContent([post], loggedUserId);
  return result;
};

const getItemByExternalId = async (externalId: string): Promise<Posts> => {
  return await getKnex()
    .table<Posts>(TABLE_NAME)
    .where("external_id", externalId)
    .first();
};

const incViews = async (posts: PostWithContent[]) => {
  // if (posts.length === 0) {
  //   return;
  // }
  // const ids = posts.map((item) => item.id);
  // return await getKnex()
  //   .table(TABLE_NAME)
  //   .whereIn("id", ids)
  //   .increment("stats_views", 1);
};

const isDuplicateKeyError = (err: unknown): boolean => {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as { code: string }).code;
    // MySQL: ER_DUP_ENTRY, SQLite: SQLITE_CONSTRAINT_UNIQUE / SQLITE_CONSTRAINT
    return (
      code === "ER_DUP_ENTRY" ||
      code === "SQLITE_CONSTRAINT_UNIQUE" ||
      code === "SQLITE_CONSTRAINT"
    );
  }
  return false;
};

const reshare = async (userId: string, postId: string): Promise<string> => {
  const original = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .where("id", postId)
    .first();

  if (!original) {
    throw new Error("Post not found");
  }
  if (original.user_id === userId) {
    throw new Error("Cannot reshare your own post");
  }
  if (original.reshare_id !== null) {
    throw new Error("Cannot reshare a reshare");
  }

  const reshareId = uuidv4();
  try {
    await getKnex()
      .table(TABLE_NAME)
      .insert({
        id: reshareId,
        user_id: userId,
        reshare_id: postId,
        content: "",
        lexical: "",
        location: original.location ?? "en",
        created_at: new Date(),
        updated_at: new Date(),
      });
  } catch (err) {
    if (isDuplicateKeyError(err)) {
      const existing = await getReshareByUser(userId, postId);
      return existing!.id;
    }
    throw err;
  }

  await getKnex()
    .table(TABLE_NAME)
    .where("id", postId)
    .increment("stats_shares", 1);

  return reshareId;
};

const unreshare = async (userId: string, postId: string): Promise<void> => {
  await getKnex()
    .table(TABLE_NAME)
    .where("user_id", userId)
    .where("reshare_id", postId)
    .delete();

  await getKnex()
    .table(TABLE_NAME)
    .where("id", postId)
    .where("stats_shares", ">", 0)
    .decrement("stats_shares", 1);
};

const getReplies = async (
  postId: string,
  loggedUserId?: string,
): Promise<PostWithContent[]> => {
  const posts = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .where("parent_id", postId)
    .orderBy("created_at", "desc");
  return await mergeWithContent(posts, loggedUserId, true);
};

const getReshareByUser = async (
  userId: string,
  postId: string,
): Promise<Selectable<Posts> | undefined> => {
  return getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .where("user_id", userId)
    .where("reshare_id", postId)
    .first();
};

const mergeWithContent = async (
  posts: Selectable<Posts>[],
  loggedUserId?: string,
  shallow = false,
): Promise<PostWithContent[]> => {
  const userIds = posts.map((item) => item.user_id);
  const postIds = posts.map((item) => item.id);

  // Collect reshare_id values to fetch original posts
  const reshareIds = Array.from(
    new Set(
      posts
        .map((p) => p.reshare_id)
        .filter((id): id is string => id !== null && id !== undefined),
    ),
  );

  const [users, details] = await Promise.all([
    userService.getByIds(userIds),
    postDetailService.getDetailsByPost(postIds),
  ]);

  // Setting user map
  const userMap = new Map(users.map((user) => [user.id, user]));

  // Setting link map
  const linkIds = details.links.map((link) => link.link_id);
  const links = await linkService.getAllByIds(linkIds);
  const linkMap = new Map(links.map((link) => [link.id, link]));
  details.links.forEach((postLink) => {
    postLink.linkDetail = linkMap.get(postLink.link_id);
  });

  // Fetch original posts for reshares (one level deep, shallow to prevent further recursion)
  let resharedPostMap = new Map<string, PostWithContent>();
  if (!shallow && reshareIds.length > 0) {
    const originalPosts = await getKnex()
      .table<Selectable<Posts>>(TABLE_NAME)
      .whereIn("id", reshareIds);
    const resolved = await mergeWithContent(originalPosts, loggedUserId, true);
    resharedPostMap = new Map(resolved.map((p) => [p.id, p]));
  }

  // Fetch parent posts for replies (one level up, shallow to prevent further recursion)
  const parentIds = Array.from(
    new Set(
      posts
        .map((p) => p.parent_id)
        .filter((id): id is string => id !== null && id !== undefined),
    ),
  );
  let parentPostMap = new Map<string, PostWithContent>();
  if (!shallow && parentIds.length > 0) {
    const parentRows = await getKnex()
      .table<Selectable<Posts>>(TABLE_NAME)
      .whereIn("id", parentIds);
    const resolvedParents = await mergeWithContent(
      parentRows,
      loggedUserId,
      true,
    );
    parentPostMap = new Map(resolvedParents.map((p) => [p.id, p]));
  }

  // Fetch which posts the logged-in user has reshared
  let userResharedSet = new Set<string>();
  if (loggedUserId && postIds.length > 0) {
    const userReshares = await getKnex()
      .table<Selectable<Posts>>(TABLE_NAME)
      .whereIn("reshare_id", postIds)
      .where("user_id", loggedUserId)
      .select("reshare_id");
    userResharedSet = new Set(
      userReshares
        .map((r) => r.reshare_id)
        .filter((id): id is string => id !== null),
    );
  }

  return posts.map((post) => {
    const postWithContent: PostWithContent = {
      ...post,
      user: userMap.get(post.user_id)!,
      links: details.links.filter((link) => link.post_id === post.id),
      mentions: details.mentions.filter((link) => link.post_id === post.id),
      hashtags: details.hashtags.filter((link) => link.post_id === post.id),
      resharedPost: post.reshare_id
        ? resharedPostMap.get(post.reshare_id)
        : undefined,
      parentPost: post.parent_id
        ? parentPostMap.get(post.parent_id)
        : undefined,
      userReshared: loggedUserId ? userResharedSet.has(post.id) : undefined,
    };
    return postWithContent;
  });
};

export default loggerAll(
  {
    insert,
    getItemsByUser,
    getItems,
    getLast100ByUser,
    getAllByUser,
    getById,
    incViews,
    getItemByExternalId,
    getItemsByHashtag,
    reshare,
    unreshare,
    getReshareByUser,
    getReplies,
  },
  "post.service",
);
