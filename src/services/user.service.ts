import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import bcrypt from "bcrypt";
import { RegisterInput } from "../helpers/dtos";
import { Users } from "../types/database";

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

const getById = async (uuid: string) => {
  return await getKnex()
    .table(TABLE_NAME)
    .where("id", uuid)
    .first<Users | undefined>();
};

const getByIds = async (uuids: string[]) => {
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

export default {
  insert,
  getByEmail,
  getByUsername,
  getById,
  getByIds,
  getByCustomDomain,
  update,
};
