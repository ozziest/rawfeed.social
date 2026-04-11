import { Queue, Worker, Job } from "bullmq";
import { getKnex } from "../db/connection";
import { logError } from "../helpers/common";
import notificationService from "../services/notification.service";
import emailService from "../services/email.service";
import { QueueNames } from "../enums";
import { REDIS_CONNECTION } from "../consts";

export type NotificationJobData = {
  userId: string;
  email: string;
  displayName: string;
  lastSentAt: string | null;
};

export function createNotificationQueue(): Queue<NotificationJobData> {
  return new Queue<NotificationJobData>(QueueNames.Notification, {
    connection: REDIS_CONNECTION,
    defaultJobOptions: {
      removeOnComplete: { count: 10 },
      removeOnFail: { count: 50 },
    },
  });
}

export function createNotificationWorker(): Worker<NotificationJobData> {
  const worker = new Worker<NotificationJobData>(
    QueueNames.Notification,
    async (job: Job<NotificationJobData>) => {
      const { userId, email, displayName, lastSentAt } = job.data;
      const now = new Date();
      const lastSentDate: Date | null = lastSentAt
        ? new Date(lastSentAt)
        : null;

      const notifications =
        await notificationService.getUnreadNotificationsForEmailDigest(
          userId,
          lastSentDate,
        );

      if (notifications.length === 0) {
        return;
      }

      await emailService.sendNotificationDigestEmail(
        email,
        displayName,
        notifications,
      );

      await getKnex()
        .table("users")
        .where("id", userId)
        .update({ notif_email_last_sent_at: now });
    },
    {
      connection: REDIS_CONNECTION,
      concurrency: 5,
    },
  );

  worker.on("failed", (job, err) => {
    logError(err, { jobId: job?.id, userId: job?.data.userId });
  });

  return worker;
}
