const fs = require("node:fs/promises");
const path = require("node:path");
const knex = require("knex");

const dbFile = process.env.DB_FILENAME || path.join(".tmp", "test.sqlite");

async function prepareSqliteDb() {
  const dbPath = path.resolve(dbFile);
  const dbDir = path.dirname(dbPath);

  await fs.mkdir(dbDir, { recursive: true });
  await fs.rm(dbPath, { force: true });

  const db = knex({
    client: "sqlite3",
    connection: { filename: dbPath },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve("migrations"),
      tableName: "knex_migrations",
    },
  });

  try {
    await db.migrate.latest();
    console.log(`SQLite test database is ready: ${dbPath}`);
  } finally {
    await db.destroy();
  }
}

prepareSqliteDb().catch((error) => {
  console.error("Failed to prepare SQLite test database", error);
  process.exit(1);
});
