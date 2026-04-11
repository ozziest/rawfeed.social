import { formatDistanceToNow } from "date-fns";
import type { NotificationWithTriggers } from "../../../types/relations";
import { TriggerAvatars } from "./TriggerAvatars";

type NotificationItemProps = {
  notification: NotificationWithTriggers;
};

function buildActionText(type: string): string {
  switch (type) {
    case "Like":
      return "liked your post";
    case "Reshare":
      return "reshared your post";
    case "Follow":
      return "followed you";
    case "Reply":
      return "replied to your post";
    case "Mention":
      return "mentioned you in a post";
    default:
      return "sent you a notification";
  }
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const isUnread = !notification.is_read;
  const action = buildActionText(notification.type);

  const isReplyOrMention =
    notification.type === "Reply" || notification.type === "Mention";
  const targetId = isReplyOrMention
    ? (notification.reply_id ?? notification.post_id)
    : notification.post_id;
  const postHref = targetId ? `/posts/${targetId}` : null;

  return (
    <div
      class={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
        isUnread
          ? "bg-blue-50 dark:bg-blue-950 border-blue-100 dark:border-blue-800"
          : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"
      }`}
    >
      <TriggerAvatars users={notification.triggerUsers} />
      <div class="flex-1 min-w-0">
        <p class="text-sm text-gray-900 dark:text-gray-100">
          {notification.triggerUsers.slice(0, 3).map((u, i, arr) => (
            <>
              <a
                href={`/u/${u.username}`}
                class="font-medium hover:underline"
                safe
              >
                {u.name || `@${u.username}`}
              </a>
              {i < arr.length - 1 ? ", " : ""}
            </>
          ))}
          {notification.count > 3
            ? ` and ${notification.count - 3} others `
            : " "}
          <span safe>{action}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5" safe>
          {formatDistanceToNow(
            new Date(notification.updated_at as unknown as string),
            { addSuffix: true },
          )}
        </p>
      </div>
      {postHref ? (
        <a
          href={postHref}
          class="text-xs text-blue-600 dark:text-blue-400 hover:underline shrink-0"
        >
          View
        </a>
      ) : (
        ""
      )}
    </div>
  );
}
