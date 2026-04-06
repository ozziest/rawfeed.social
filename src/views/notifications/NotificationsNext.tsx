import type { NotificationWithTriggers } from "../../types/relations";
import { NotificationItem } from "../components/shared/NotificationItem";

type NotificationsNextProps = {
  notifications: NotificationWithTriggers[];
  nextCursor: string | null;
};

export function NotificationsNext({
  notifications,
  nextCursor,
}: NotificationsNextProps) {
  return (
    <>
      {notifications.map((n) => (
        <NotificationItem notification={n} />
      ))}
      {nextCursor ? (
        <div
          hx-get={`/notifications/next/${nextCursor}`}
          hx-trigger="intersect once"
          hx-swap="outerHTML"
          class="h-20 flex items-center justify-center"
        >
          <div class="animate-pulse text-gray-500 dark:text-gray-400">
            Loading more...
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
