import { getKnex } from "../db/connection";
import { RssSourceRow } from "../types/shared";

const TABLE_NAME = "rss_sources";

const getApproved = async (): Promise<RssSourceRow[]> => {
  return getKnex()
    .table(`${TABLE_NAME} as rs`)
    .select(
      "rs.id",
      "rs.submitted_by",
      "rs.bot_user_id",
      "rs.url",
      "rs.name",
      "rs.bio",
      "rs.category",
      "rs.language",
      "rs.update_frequency",
      "rs.status",
      "rs.created_at",
      "rs.updated_at",
      "u.username",
    )
    .leftJoin("users as u", "u.id", "rs.bot_user_id")
    .where("rs.status", "approved");
};

const getById = async (id: string): Promise<RssSourceRow | undefined> => {
  const row = await getKnex()
    .table(`${TABLE_NAME} as rs`)
    .select(
      "rs.id",
      "rs.submitted_by",
      "rs.bot_user_id",
      "rs.url",
      "rs.name",
      "rs.bio",
      "rs.category",
      "rs.language",
      "rs.update_frequency",
      "rs.status",
      "rs.created_at",
      "rs.updated_at",
      "u.username",
    )
    .leftJoin("users as u", "u.id", "rs.bot_user_id")
    .where("rs.id", id)
    .first();
  return row ?? undefined;
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

const rssSourceService = { getApproved, getById, updateBotUserId };
export default rssSourceService;
