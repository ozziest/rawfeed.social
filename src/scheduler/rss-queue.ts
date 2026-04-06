import { Queue, Worker, Job } from "bullmq";
import { RSSService } from "../services/rss.service";
import rssSourceService from "../services/rssSource.service";
import { logError } from "../helpers/common";
import {
  queueJobsTotal,
  queueJobDuration,
  queueJobsActive,
  cronLastRun,
} from "../metrics";

export const QUEUE_NAME = "rss-fetch";

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
};

export type RssFetchJobData = {
  sourceId: string;
};

export function createRssQueue(): Queue<RssFetchJobData> {
  return new Queue<RssFetchJobData>(QUEUE_NAME, {
    connection,
    defaultJobOptions: {
      removeOnComplete: { count: 10 },
      removeOnFail: { count: 50 },
    },
  });
}

export function createRssWorker(): Worker<RssFetchJobData> {
  const rssService = new RSSService();

  const worker = new Worker<RssFetchJobData>(
    QUEUE_NAME,
    async (job: Job<RssFetchJobData>) => {
      const { sourceId } = job.data;

      const row = await rssSourceService.getById(sourceId);
      if (!row || row.status !== "approved") {
        return;
      }

      const source = {
        uuid: row.bot_user_id ?? undefined,
        username: row.username ?? "",
        name: row.name,
        bio: row.bio ?? "",
        url: row.url,
        category: (row.category ?? "blog") as any,
        language: row.language as any,
        updateFrequency: row.update_frequency,
      };

      const endTimer = queueJobDuration.startTimer();
      try {
        const result = await rssService.fetchFeed(source);
        await rssService.processFeedItems(source, result.items);
      } finally {
        endTimer();
      }
    },
    {
      connection,
      concurrency: 5,
    },
  );

  worker.on("active", () => {
    queueJobsActive.inc();
  });

  worker.on("completed", (job) => {
    queueJobsActive.dec();
    queueJobsTotal.inc({ status: "completed" });
    cronLastRun.set({ job: job.name }, Date.now() / 1000);
  });

  worker.on("failed", (job, err) => {
    queueJobsActive.dec();
    queueJobsTotal.inc({ status: "failed" });
    logError(err, {
      jobId: job?.id,
      sourceId: job?.data?.sourceId,
      tags: { module: "rss", action: "fetch_feed" },
    });
  });

  return worker;
}
