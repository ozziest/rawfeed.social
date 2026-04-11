import { Queue, Worker } from "bullmq";
import { Cron } from "croner";
import { logError } from "../helpers/common";
import userService from "../services/user.service";
import {
  createNotificationQueue,
  createNotificationWorker,
  NotificationJobData,
} from "./notification-queue";

let queue: Queue<NotificationJobData> | null = null;
let worker: Worker<NotificationJobData> | null = null;

function isEligible(freq: string, lastSent: Date | null, now: Date): boolean {
  if (!lastSent) {
    return true;
  }

  const diffMs = now.getTime() - lastSent.getTime();

  switch (freq) {
    case "hourly":
      return diffMs >= 60 * 60 * 1000;
    case "daily":
      return diffMs >= 24 * 60 * 60 * 1000;
    case "weekly":
      return diffMs >= 7 * 24 * 60 * 60 * 1000;
    default:
      return false;
  }
}

async function enqueueNotificationDigestJobs(): Promise<void> {
  try {
    const now = new Date();
    const users = await userService.getUsersForNotificationDigest();

    for (const user of users) {
      const lastSent: Date | null = user.notif_email_last_sent_at
        ? new Date(user.notif_email_last_sent_at)
        : null;

      if (!isEligible(user.notif_email_freq, lastSent, now)) {
        continue;
      }

      await queue!.add(`digest:${user.id}`, {
        userId: user.id,
        email: user.email,
        displayName: user.name || user.username,
        lastSentAt: user.notif_email_last_sent_at
          ? new Date(user.notif_email_last_sent_at).toISOString()
          : null,
      } satisfies NotificationJobData);
    }
  } catch (error) {
    logError(error);
  }
}

export function initializeNotificationEmailScheduler(): void {
  worker = createNotificationWorker();
  queue = createNotificationQueue();

  // It runs at the top of every hour, every day.
  new Cron("0 * * * *", async () => {
    await enqueueNotificationDigestJobs();
  });
}

export async function shutdownNotificationEmailScheduler(): Promise<void> {
  await Promise.all([worker?.close(), queue?.close()]);
  worker = null;
  queue = null;
}
