import { Registry, Counter, Histogram, Gauge } from "prom-client";

export const register = new Registry();

export const queueJobsTotal = new Counter({
  name: "queue_jobs_total",
  help: "Total number of completed jobs",
  labelNames: ["status"] as const, // "completed" | "failed"
  registers: [register],
});

export const queueJobDuration = new Histogram({
  name: "queue_job_duration_seconds",
  help: "Duration of a single feed fetch job in seconds",
  buckets: [0.1, 0.5, 1, 2, 5, 10, 15, 30, 60],
  registers: [register],
});

export const queueJobsActive = new Gauge({
  name: "queue_jobs_active",
  help: "Number of currently active jobs",
  registers: [register],
});

export const queueJobsWaiting = new Gauge({
  name: "queue_jobs_waiting",
  help: "Number of jobs waiting in the queue",
  registers: [register],
});

export const cronLastRun = new Gauge({
  name: "cron_last_run_timestamp",
  help: "Unix timestamp of the last cron run",
  labelNames: ["job"] as const,
  registers: [register],
});

export const rssFeedItemsFetched = new Counter({
  name: "rss_feed_items_fetched_total",
  help: "Total number of items received from RSS feeds",
  registers: [register],
});

export const rssFeedItemsInserted = new Counter({
  name: "rss_feed_items_inserted_total",
  help: "Total number of new RSS items inserted as posts",
  registers: [register],
});

export const rssFeedRobotsBlocked = new Counter({
  name: "rss_feed_robots_blocked_total",
  help: "Total number of RSS fetches blocked by robots.txt",
  registers: [register],
});
