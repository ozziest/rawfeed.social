import { defineConfig, devices } from "@playwright/test";

const appPort = Number(process.env.APP_PORT || 3311);
const dbFile = process.env.DB_FILENAME || ".tmp/test.sqlite";

export default defineConfig({
  testDir: "./tests/sqlite",
  timeout: 30_000,
  fullyParallel: false,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${appPort}`,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "ts-node --transpile-only src/server.tsx",
    port: appPort,
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      NODE_ENV: "test",
      APP_PORT: String(appPort),
      APP_URL: `http://127.0.0.1:${appPort}`,
      APP_SECRET: process.env.APP_SECRET || "sqlite-test-app-secret",
      JWT_SECRET: process.env.JWT_SECRET || "sqlite-test-jwt-secret",
      DB_CLIENT: "sqlite3",
      DB_FILENAME: dbFile,
    },
  },
});
