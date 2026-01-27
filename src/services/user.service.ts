import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { RegisterInput } from "../helpers/dtos";
import { Users } from "../types/database";
import { RSSSourceWithUser } from "../types/shared";
import { Insertable } from "kysely";

const TABLE_NAME = "users";

const insert = async (input: RegisterInput) => {
  const id = uuidv4();
  await getKnex()
    .table(TABLE_NAME)
    .insert({
      id,
      name: input.username,
      username: input.username,
      email: input.email,
      password: await bcrypt.hash(input.password, 10),
      created_at: new Date(),
      updated_at: new Date(),
    });
  return id;
};

const getByEmail = async (email: string) => {
  return await getKnex()
    .table(TABLE_NAME)
    .where("email", email)
    .first<Users | undefined>();
};

const getByUsername = async (username: string) => {
  return await getKnex()
    .table(TABLE_NAME)
    .where("username", username)
    .first<Users | undefined>();
};

const getAllByUsernames = async (usernames: string[]): Promise<Users[]> => {
  return await getKnex()
    .table<Users>(TABLE_NAME)
    .whereIn("username", usernames);
};

const getById = async (uuid: string) => {
  return await getKnex()
    .table(TABLE_NAME)
    .where("id", uuid)
    .first<Users | undefined>();
};

const getByIds = async (uuids: string[]): Promise<Users[]> => {
  if (uuids.length === 0) {
    return [];
  }

  return await getKnex().table<Users>(TABLE_NAME).whereIn("id", uuids);
};

const getByCustomDomain = async (domain: string) => {
  return await getKnex()
    .table(TABLE_NAME)
    .where("custom_domain", domain)
    .first<Users | undefined>();
};

const update = async (uuid: string, data: Partial<Users>) => {
  return await getKnex()
    .table(TABLE_NAME)
    .where("id", uuid)
    .update({
      ...data,
      updated_at: new Date(),
    });
};

const createRSSBot = async (resource: RSSSourceWithUser) => {
  const user = await getByUsername(resource.username);
  if (user) {
    return user;
  }

  const id = uuidv4();
  const email = `${resource.username}@rawfeed.social`;
  const randomPassword = crypto.randomBytes(32).toString("hex");
  const password = await bcrypt.hash(randomPassword, 10);

  await getKnex().table<Insertable<Users>>(TABLE_NAME).insert({
    id,
    name: resource.name,
    username: resource.username,
    bio: resource.bio,
    email,
    password,
    bot_type: "rss",
    created_at: new Date(),
    updated_at: new Date(),
  });

  return await getById(id);
};

export default {
  insert,
  getByEmail,
  getByUsername,
  getAllByUsernames,
  getById,
  getByIds,
  getByCustomDomain,
  update,
  createRSSBot,
};
