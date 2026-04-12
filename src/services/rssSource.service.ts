import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { RssSources } from "../types/database";
import { RssSourceRow } from "../types/shared";

const TABLE_NAME = "rss_sources";

const SHARED_SELECT = [
  "rs.id",
  "rs.submitted_by",
  "rs.bot_user_id",
  "rs.url",
  "rs.name",
  "rs.bio",
  "rs.category",
  "rs.language",
  "rs.update_frequency",
  "rs.created_at",
  "rs.updated_at",
  "u.username",
] as const;

const getAll = async (): Promise<RssSourceRow[]> => {
  return getKnex()
    .table(`${TABLE_NAME} as rs`)
    .select(...SHARED_SELECT)
    .leftJoin("users as u", "u.id", "rs.bot_user_id");
};

const getById = async (id: string): Promise<RssSourceRow | undefined> => {
  const row = await getKnex()
    .table(`${TABLE_NAME} as rs`)
    .select(...SHARED_SELECT)
    .leftJoin("users as u", "u.id", "rs.bot_user_id")
    .where("rs.id", id)
    .first();
  return row ?? undefined;
};

const getByUserId = async (userId: string) => {
  return await getKnex()
    .table<RssSources>(TABLE_NAME)
    .where("bot_user_id", userId)
    .first();
};

const urlExists = async (url: string): Promise<boolean> => {
  const row = await getKnex().table(TABLE_NAME).where("url", url).first();
  return !!row;
};

const create = async (data: {
  submitted_by: string;
  bot_user_id: string;
  url: string;
  name: string;
  bio: string;
  category: string;
  language: string;
  update_frequency: string;
}): Promise<RssSourceRow> => {
  const id = uuidv4();
  const now = new Date();
  await getKnex()
    .table(TABLE_NAME)
    .insert({
      id,
      submitted_by: data.submitted_by,
      bot_user_id: data.bot_user_id,
      url: data.url,
      name: data.name,
      bio: data.bio || null,
      category: data.category || null,
      language: data.language,
      update_frequency: data.update_frequency,
      created_at: now,
      updated_at: now,
    });
  const row = await getById(id);
  return row!;
};

const updateBotUserId = async (
  id: string,
  botUserId: string,
): Promise<void> => {
  await getKnex()
    .table(TABLE_NAME)
    .where({ id })
    .update({ bot_user_id: botUserId, updated_at: new Date() });
};

export default {
  getAll,
  getById,
  getByUserId,
  urlExists,
  create,
  updateBotUserId,
};
