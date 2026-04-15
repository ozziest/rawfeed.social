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
import { QueueNames } from "../enums";
import { REDIS_CONNECTION } from "../consts";

export type RssFetchJobData = {
  sourceId: string;
  feedUrl: string;
};

export function createRssQueue(): Queue<RssFetchJobData> {
  return new Queue<RssFetchJobData>(QueueNames.RSS, {
    connection: REDIS_CONNECTION,
    defaultJobOptions: {
      removeOnComplete: { count: 10 },
      removeOnFail: { count: 50 },
    },
  });
}

export function createRssWorker(): Worker<RssFetchJobData> {
  const rssService = new RSSService();

  const worker = new Worker<RssFetchJobData>(
    QueueNames.RSS,
    async (job: Job<RssFetchJobData>) => {
      const { sourceId } = job.data;

      const row = await rssSourceService.getById(sourceId);
      if (!row) {
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
      connection: REDIS_CONNECTION,
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
      feedUrl: job?.data?.feedUrl,
      tags: { module: "rss", action: "fetch_feed" },
    });
  });

  return worker;
}
