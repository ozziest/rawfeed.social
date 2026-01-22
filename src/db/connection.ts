import type { Knex } from "knex";
import knex from "knex";

let instance: Knex | null = null;

const connection = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "rawfeed",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
};

export function getKnex(): Knex {
  if (!instance) {
    instance = knex({
      client: "mysql2",
      connection,
    });
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
