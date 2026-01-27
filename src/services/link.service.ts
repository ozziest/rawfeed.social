import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { Links } from "../types/database";

const TABLE_NAME = "links";

const insert = async (code: string, link: string) => {
  const id = uuidv4();
  await getKnex().table(TABLE_NAME).insert({
    id,
    code,
    link,
    created_at: new Date(),
    updated_at: new Date(),
  });
  return id;
};

const getAllByIds = async (ids: string[]): Promise<Links[]> => {
  return await getKnex().table<Links>(TABLE_NAME).whereIn("id", ids);
};

const getByCode = async (code: string): Promise<Links> => {
  return await getKnex().table<Links>(TABLE_NAME).where("code", code).first();
};

const incCount = async (id: string) => {
  return await getKnex()
    .table(TABLE_NAME)
    .where("id", id)
    .increment("count", 1);
};

export default {
  insert,
  getAllByIds,
  getByCode,
  incCount,
};
