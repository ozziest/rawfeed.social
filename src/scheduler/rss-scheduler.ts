import { Queue, Worker } from "bullmq";
import { logError } from "../helpers/common";
import userService from "../services/user.service";
import rssSourceService from "../services/rssSource.service";
import { createRssQueue, createRssWorker, RssFetchJobData } from "./rss-queue";
import { RssSourceRow } from "../types/shared";
import { IS_DEVELOPMENT } from "../consts";

let queue: Queue<RssFetchJobData> | null = null;
let worker: Worker<RssFetchJobData> | null = null;

async function ensureBotUser(row: RssSourceRow): Promise<void> {
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
}

async function scheduleSource(
  queue: Queue<RssFetchJobData>,
  row: RssSourceRow,
): Promise<void> {
  await queue.upsertJobScheduler(
    row.id,
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

  if (IS_DEVELOPMENT) {
    await queue.add(`fetch:${row.name}:immediate`, { sourceId: row.id });
  }
}

export async function initializeRSSScheduler() {
  const rows = await rssSourceService.getApproved();

  await Promise.allSettled(
    rows.map((row) =>
      ensureBotUser(row).catch((error) =>
        logError(error as Error, {
          sourceId: row.id,
          feedUrl: row.url,
          tags: { module: "rss", action: "create_bot_user" },
        }),
      ),
    ),
  );

  worker = createRssWorker();
  queue = createRssQueue();

  await Promise.all(rows.map((row) => scheduleSource(queue!, row)));

  console.log(`[RSS Scheduler] ${rows.length} sources queued via BullMQ`);
}

export async function shutdownRSSScheduler() {
  await worker?.close();
  await queue?.close();
  queue = null;
  worker = null;
}
