import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { cache, bust } from "../helpers/cache";
import {
  NotificationType,
  NotificationWithTriggers,
  NotificationTriggerUser,
} from "../types/relations";
import userService from "./user.service";
import { NOTIFICATION_SIZE } from "../consts";

const findExistingNotification = async (
  recipientId: string,
  type: NotificationType,
  cutoff: Date,
  postId?: string,
) => {
  return getKnex()
    .table("notifications")
    .where("user_id", recipientId)
    .where("type", type)
    .where("created_at", ">=", cutoff)
    .where(function () {
      if (postId) {
        this.where("post_id", postId);
      } else {
        this.whereNull("post_id");
      }
    })
    .orderBy("created_at", "desc")
    .first();
};

const incrementNotification = async (id: string, count: number) => {
  return getKnex()
    .table("notifications")
    .where("id", id)
    .update({
      count: count + 1,
      is_read: false,
      updated_at: new Date(),
    });
};

const createNotification = async (
  id: string,
  type: NotificationType,
  recipientId: string,
  postId?: string,
  replyId?: string,
) => {
  return getKnex()
    .table("notifications")
    .insert({
      id,
      type,
      user_id: recipientId,
      post_id: postId ?? null,
      reply_id: replyId ?? null,
      count: 1,
      is_read: false,
      created_at: new Date(),
      updated_at: new Date(),
    });
};

const createNotificationTrigger = async (
  notificationId: string,
  triggerUserId: string,
) => {
  return getKnex().table("notifications_triggers").insert({
    id: uuidv4(),
    notification_id: notificationId,
    trigger_user_id: triggerUserId,
    created_at: new Date(),
    updated_at: new Date(),
  });
};

const getNotificationTriggers = async (notificationIds: string[]) => {
  return getKnex()
    .table("notifications_triggers")
    .join("users", "notifications_triggers.trigger_user_id", "users.id")
    .whereIn("notifications_triggers.notification_id", notificationIds)
    .orderBy("notifications_triggers.created_at", "desc")
    .select(
      "notifications_triggers.notification_id",
      "notifications_triggers.trigger_user_id",
      "users.username",
      "users.name",
      "users.email",
      "users.bot_type",
    );
};

const fetchNotificationsForUser = async (userId: string, cursor?: string) => {
  let query = getKnex()
    .table("notifications")
    .where("user_id", userId)
    .orderBy("updated_at", "desc")
    .limit(NOTIFICATION_SIZE)
    .select("*");

  if (cursor) {
    const [timestamp, id] = cursor.split("_");
    query = query.where(function () {
      this.where("updated_at", "<", new Date(timestamp)).orWhere(function () {
        this.where("updated_at", "=", new Date(timestamp)).andWhere(
          "id",
          "<",
          id,
        );
      });
    });
  }

  return query;
};

export const nextNotificationCursor = (
  notifications: NotificationWithTriggers[],
): string | null => {
  if (notifications.length < NOTIFICATION_SIZE) {
    return null;
  }
  const last = notifications[notifications.length - 1];
  const timestamp =
    last.updated_at instanceof Date
      ? last.updated_at.toISOString()
      : new Date(last.updated_at!).toISOString();
  return `${timestamp}_${last.id}`;
};

const upsertNotification = async (
  recipientId: string,
  type: NotificationType,
  triggerUserId: string,
  postId?: string,
  replyId?: string,
): Promise<void> => {
  if (recipientId === triggerUserId) {
    return;
  }

  const [triggerUser, recipientUser] = await Promise.all([
    userService.getById(triggerUserId),
    userService.getById(recipientId),
  ]);

  if (!triggerUser || triggerUser.bot_type != null) {
    return;
  }

  if (!recipientUser || recipientUser.bot_type != null) {
    return;
  }

  // Deduplicate notifications within a 24-hour window to avoid spamming
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const existing = await findExistingNotification(
    recipientId,
    type,
    cutoff,
    postId,
  );

  let notificationId: string;

  if (existing) {
    notificationId = existing.id;
    await incrementNotification(existing.id, existing.count);
  } else {
    notificationId = uuidv4();
    await createNotification(
      notificationId,
      type,
      recipientId,
      postId,
      replyId,
    );
  }

  await createNotificationTrigger(notificationId, triggerUserId);

  await bust("notification.service.getUnreadCount", { userId: recipientId });
};

const getNotificationsForUser = async (
  userId: string,
  cursor?: string,
): Promise<NotificationWithTriggers[]> => {
  const notifications = await fetchNotificationsForUser(userId, cursor);

  if (notifications.length === 0) {
    return [];
  }

  const notificationIds = notifications.map((n: { id: string }) => n.id);

  const triggers = await getNotificationTriggers(notificationIds);

  const triggerMap = new Map<string, NotificationTriggerUser[]>();
  for (const t of triggers) {
    const list = triggerMap.get(t.notification_id) ?? [];
    list.push({
      trigger_user_id: t.trigger_user_id,
      username: t.username,
      name: t.name,
      email: t.email,
      bot_type: t.bot_type ?? null,
    });
    triggerMap.set(t.notification_id, list);
  }

  return notifications.map(
    (n: {
      id: string;
      type: NotificationType;
      user_id: string;
      post_id: string | null;
      reply_id: string | null;
      count: number;
      is_read: boolean | number;
      created_at: Date | null;
      updated_at: Date | null;
    }) => ({
      ...n,
      triggerUsers: triggerMap.get(n.id) ?? [],
    }),
  );
};

const getUnreadCount = async (userId: string): Promise<number> => {
  return cache(
    "notification.service.getUnreadCount",
    300,
    async () => {
      const result = await getKnex()
        .table("notifications")
        .where("user_id", userId)
        .where("is_read", false)
        .count("* as count")
        .first();
      return Number(result?.count ?? 0);
    },
    { userId },
  );
};

const markAllAsRead = async (userId: string): Promise<void> => {
  await getKnex()
    .table("notifications")
    .where("user_id", userId)
    .where("is_read", false)
    .update({ is_read: true, updated_at: new Date() });

  await bust("notification.service.getUnreadCount", { userId });
};

const getUnreadNotificationsForEmailDigest = async (
  userId: string,
  since?: Date | null,
): Promise<NotificationWithTriggers[]> => {
  let query = getKnex()
    .table("notifications")
    .where("user_id", userId)
    .orderBy("updated_at", "desc")
    .limit(50);

  if (since) {
    query = query.where("created_at", ">", since);
  } else {
    query = query.where("is_read", false);
  }

  const notifications = await query.select("*");

  if (notifications.length === 0) {
    return [];
  }

  const notificationIds = notifications.map((n: { id: string }) => n.id);

  const triggers = await getNotificationTriggers(notificationIds);

  const triggerMap = new Map<string, NotificationTriggerUser[]>();
  for (const t of triggers) {
    const list = triggerMap.get(t.notification_id) ?? [];
    list.push({
      trigger_user_id: t.trigger_user_id,
      username: t.username,
      name: t.name,
      email: t.email,
      bot_type: t.bot_type ?? null,
    });
    triggerMap.set(t.notification_id, list);
  }

  return notifications.map(
    (n: {
      id: string;
      type: NotificationType;
      user_id: string;
      post_id: string | null;
      reply_id: string | null;
      count: number;
      is_read: boolean | number;
      created_at: Date | null;
      updated_at: Date | null;
    }) => ({
      ...n,
      triggerUsers: triggerMap.get(n.id) ?? [],
    }),
  );
};

export default {
  upsertNotification,
  getNotificationsForUser,
  getUnreadCount,
  markAllAsRead,
  getUnreadNotificationsForEmailDigest,
};
