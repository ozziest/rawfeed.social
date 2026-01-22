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

export default {
  insert,
  getByEmail,
};
