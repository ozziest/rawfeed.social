import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { Hashtags } from "../types/database";
import { format, subHours } from "date-fns";
import { DailyReportItem } from "../types/shared";

const TABLE_NAME = "hashtags";

const insert = async (hashtag: string) => {
  const id = uuidv4();
  await getKnex().table(TABLE_NAME).insert({
    id,
    hashtag,
    created_at: new Date(),
    updated_at: new Date(),
  });
  return id;
};

const getUsedHashtags = async (tags: string[]) => {
  return await getKnex().table<Hashtags>(TABLE_NAME).whereIn("hashtag", tags);
};

const getDailyReport = async () => {
  const last24Hours = format(subHours(new Date(), 24), "yyyy-MM-dd HH:mm");

  const report = await getKnex()
    .table("post_hashtags")
    .innerJoin("posts", "posts.id", "post_hashtags.post_id")
    .innerJoin("hashtags", "hashtags.id", "post_hashtags.hashtag_id")
    .select("hashtags.hashtag", getKnex().raw("COUNT(*) as total"))
    .where("posts.created_at", ">=", last24Hours)
    .groupBy("hashtags.id", "hashtags.hashtag")
    .orderBy("total", "desc")
    .limit(3);

  return report as DailyReportItem[];
};

export default {
  insert,
  getUsedHashtags,
  getDailyReport,
};
