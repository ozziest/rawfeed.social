import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { PostInput } from "../helpers/dtos";
import { Posts } from "../types/database";
import { sanitize } from "../helpers/security";
import { PostWithUser } from "../types/relations";
import userService from "./user.service";
import { Selectable } from "kysely";

const TABLE_NAME = "posts";

const insert = async (userId: string, input: PostInput) => {
  const id = uuidv4();
  const cleanInput = sanitize(input.content);

  await getKnex().table(TABLE_NAME).insert({
    id,
    user_id: userId,
    content: cleanInput,
    lexical: cleanInput,
    location: input.location,
    created_at: new Date(),
    updated_at: new Date(),
  });
  return id;
};

const getItemsByUser = async (userId: string): Promise<PostWithUser[]> => {
  const posts = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .where("user_id", userId)
    .orderBy("created_at", "desc")
    .limit(100);
  return await mergeWithUsers(posts);
};

const getItems = async (): Promise<PostWithUser[]> => {
  const posts = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .orderBy("created_at", "desc")
    .limit(100);
  return await mergeWithUsers(posts);
};

const getLast100 = async (): Promise<PostWithUser[]> => {
  const posts = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .orderBy("created_at", "desc")
    .limit(100);
  return await mergeWithUsers(posts);
};

const getLast100ByUser = async (userId: string): Promise<PostWithUser[]> => {
  const posts = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .where("user_id", userId)
    .orderBy("created_at", "desc")
    .limit(100);
  return await mergeWithUsers(posts);
};

const getById = async (id: string): Promise<PostWithUser | undefined> => {
  const post = await getKnex()
    .table<Selectable<Posts>>(TABLE_NAME)
    .where("id", id)
    .first();

  const [postWithUser] = await mergeWithUsers([post]);
  return postWithUser;
};

const incViews = async (posts: PostWithUser[]) => {
  const ids = posts.map((item) => item.id);
  return await getKnex()
    .table(TABLE_NAME)
    .whereIn("id", ids)
    .increment("stats_views", 1);
};

const mergeWithUsers = async (
  posts: Selectable<Posts>[],
): Promise<PostWithUser[]> => {
  const userIds = posts.map((item) => item.user_id);
  if (userIds.length === 0) {
    return posts as PostWithUser[];
  }

  const users = await userService.getByIds(userIds);

  const userMap = new Map(users.map((user) => [user.id, user]));

  return posts.map((post) => {
    const postWithUser: PostWithUser = {
      ...post,
      user: userMap.get(post.user_id)!,
    };
    return postWithUser;
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
  mergeWithUsers,
};
