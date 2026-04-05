import { Queue, Worker } from "bullmq";
import { logError } from "../helpers/common";
import userService from "../services/user.service";
import rssSourceService from "../services/rssSource.service";
import { createRssQueue, createRssWorker, RssFetchJobData } from "./rss-queue";

let queue: Queue<RssFetchJobData> | null = null;
let worker: Worker<RssFetchJobData> | null = null;

export async function initializeRSSScheduler(isDevelopment: boolean) {
  const rows = await rssSourceService.getApproved();

  // Ensure a bot user exists for every approved source — run in parallel
  await Promise.allSettled(
    rows.map(async (row) => {
      try {
        const source = {
          username: row.username ?? "",
          name: row.name,
          bio: row.bio ?? "",
          url: row.url,
          category: (row.category ?? "blog") as any,
          language: row.language as any,
          updateFrequency: row.update_frequency,
        };
        const user = await userService.createRSSBot(source);
        if (user && !row.bot_user_id) {
          await rssSourceService.updateBotUserId(row.id, user.id);
          row.bot_user_id = user.id;
        }
      } catch (error) {
        logError(error as Error, {
          sourceId: row.id,
          feedUrl: row.url,
          tags: { module: "rss", action: "create_bot_user" },
        });
      }
    }),
  );

  // Start the worker (processes jobs with concurrency=5)
  worker = createRssWorker();

  // Register a repeating job per source — upsertJobScheduler is idempotent
  // so restarting the server won't create duplicate schedules
  queue = createRssQueue();

  for (const row of rows) {
    await queue.upsertJobScheduler(
      row.id, // stable job scheduler ID = source UUID
      { pattern: row.update_frequency },
      {
        name: `fetch:${row.name}`,
        data: { sourceId: row.id },
        opts: {
          removeOnComplete: { count: 10 },
          removeOnFail: { count: 50 },
        },
      },
    );

    // In development, trigger an immediate run so you don't wait for the
    // first cron tick
    if (isDevelopment) {
      await queue.add(`fetch:${row.name}:immediate`, { sourceId: row.id });
    }
  }

  console.log(`[RSS Scheduler] ${rows.length} sources queued via BullMQ`);
}

export async function shutdownRSSScheduler() {
  await worker?.close();
  await queue?.close();
  queue = null;
  worker = null;
}
