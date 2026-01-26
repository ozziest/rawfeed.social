import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { PostInput } from "../helpers/dtos";
import { Posts } from "../types/database";
import { sanitize } from "../helpers/security";

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

const getItemsByUser = async (userId: string): Promise<Posts[]> => {
  return await getKnex()
    .table<Posts>(TABLE_NAME)
    .where("user_id", userId)
    .orderBy("created_at", "desc")
    .limit(100);
};

const getItems = async (): Promise<Posts[]> => {
  return await getKnex()
    .table<Posts>(TABLE_NAME)
    .orderBy("created_at", "desc")
    .limit(100);
};

const getLast100 = async (): Promise<Posts[]> => {
  return await getKnex()
    .table<Posts>(TABLE_NAME)
    .orderBy("created_at", "desc")
    .limit(100);
};

const getLast100ByUser = async (userId: string): Promise<Posts[]> => {
  return await getKnex()
    .table<Posts>(TABLE_NAME)
    .where("user_id", userId)
    .orderBy("created_at", "desc")
    .limit(100);
};

const getById = async (id: string): Promise<Posts | undefined> => {
  return await getKnex().table<Posts>(TABLE_NAME).where("id", id).first();
};

const incViews = async (posts: Posts[]) => {
  const ids = posts.map((item) => item.id);
  return await getKnex()
    .table(TABLE_NAME)
    .whereIn("id", ids)
    .increment("stats_views", 1);
};

export default {
  insert,
  getItemsByUser,
  getItems,
  getLast100,
  getLast100ByUser,
  getById,
  incViews,
};
