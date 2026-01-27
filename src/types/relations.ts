import { Selectable } from "kysely";
import { Posts, Users } from "./database";

export type PostWithUser = Selectable<Posts> & {
  user: Selectable<Users>;
};
