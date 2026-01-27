import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { Hashtags } from "../types/database";

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

export default {
  insert,
  getUsedHashtags,
};
