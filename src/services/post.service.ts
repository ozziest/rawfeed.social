import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { PostInput } from "../helpers/dtos";
import { Posts } from "../types/database";
import { PostWithContent } from "../types/relations";
import userService from "./user.service";
import { Selectable } from "kysely";
import contentService from "./content.service";
import postDetailService from "./postDetailService";
import linkService from "./link.service";

const TABLE_NAME = "posts";

const insert = async (
  userId: string,
  input: PostInput,
  externalId?: string,
  created_at?: Date,
) => {
  const postId = uuidv4();
  const postContent = await contentService.toPostContent(input.content);

  await getKnex()
    .table(TABLE_NAME)
    .insert({
      id: postId,
      user_id: userId,
      content: postContent.content,
      lexical: postContent.content,
      location: input.location,
      external_id: externalId,
      created_at: created_at || new Date(),
      updated_at: new Date(),
    });

  await postDetailService.insert(postId, postContent);

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

const getItems = async (): Promise<PostWithContent[]> => {
  const posts = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .orderBy("created_at", "desc")
    .limit(100);
  return await mergeWithContent(posts);
};

const getLast100 = async (): Promise<PostWithContent[]> => {
  const posts = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .orderBy("created_at", "desc")
    .limit(100);
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

const getById = async (id: string): Promise<PostWithContent | undefined> => {
  const post = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .where("id", id)
    .first();

  const [PostWithContent] = await mergeWithContent([post]);
  return PostWithContent;
};

const getItemByExternalId = async (externalId: string): Promise<Posts> => {
  return await getKnex()
    .table<Posts>(TABLE_NAME)
    .where("external_id", externalId)
    .first();
};

const incViews = async (posts: PostWithContent[]) => {
  const ids = posts.map((item) => item.id);
  return await getKnex()
    .table(TABLE_NAME)
    .whereIn("id", ids)
    .increment("stats_views", 1);
};

const mergeWithContent = async (
  posts: Selectable<Posts>[],
): Promise<PostWithContent[]> => {
  const userIds = posts.map((item) => item.user_id);
  const postIds = posts.map((item) => item.id);

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

  return posts.map((post) => {
    const postWithContent: PostWithContent = {
      ...post,
      user: userMap.get(post.user_id)!,
      links: details.links.filter((link) => link.post_id === post.id),
      mentions: details.mentions.filter((link) => link.post_id === post.id),
      hashtags: details.hashtags.filter((link) => link.post_id === post.id),
    };
    return postWithContent;
  });
};

export default {
  insert,
  getItemsByUser,
  getItems,
  getLast100,
  getLast100ByUser,
  getById,
  incViews,
  getItemByExternalId,
};
