import type { Knex } from "knex";
import knex from "knex";

let instance: Knex | null = null;

const dbClient = process.env.DB_CLIENT || "mysql2";

const getConfig = (): Knex.Config => {
  if (dbClient === "sqlite3") {
    return {
      client: "sqlite3",
      connection: {
        filename: process.env.DB_FILENAME || ".tmp/test.sqlite",
      },
      useNullAsDefault: true,
    };
  }

  return {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "rawfeed",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    },
    pool: {
      min: 5,
      max: 20,
    },
  };
};

export function getKnex(): Knex {
  if (!instance) {
    instance = knex(getConfig());
  }
  return instance;
}

export async function closeKnex(): Promise<void> {
  if (instance) {
    await instance.destroy();
    instance = null;
  }
}

export default getKnex();
