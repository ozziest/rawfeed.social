require("dotenv").config();

const dbClient = process.env.DB_CLIENT || "mysql2";

const config =
  dbClient === "sqlite3"
    ? {
        client: "sqlite3",
        connection: {
          filename: process.env.DB_FILENAME || ".tmp/test.sqlite",
        },
        useNullAsDefault: true,
        migrations: {
          directory: "./migrations",
          tableName: "knex_migrations",
        },
      }
    : {
        client: "mysql2",
        connection: {
          host: process.env.DB_HOST || "127.0.0.1",
          user: process.env.DB_USER || "root",
          password: process.env.DB_PASSWORD || "",
          database: process.env.DB_DATABASE || "rawfeed",
          port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        },
        migrations: {
          directory: "./migrations",
          tableName: "knex_migrations",
        },
      };

module.exports = config;
