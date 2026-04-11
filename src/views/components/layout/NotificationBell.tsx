import { BellIcon } from "../icons/BellIcon";

type NotificationBellProps = {
  unreadCount: number;
  mobile?: boolean;
};

export function NotificationBell({
  unreadCount,
  mobile,
}: NotificationBellProps) {
  if (mobile) {
    return (
      <a
        href="/notifications"
        class="relative flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
      >
        <BellIcon class="w-5 h-5" />
        Notifications
        {unreadCount > 0 ? (
          <span
            class="flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold text-white bg-red-500 rounded-full"
            safe
          >
            {unreadCount > 9 ? "9+" : String(unreadCount)}
          </span>
        ) : (
          ""
        )}
      </a>
    );
  }

  return (
    <a
      href="/notifications"
      class="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      aria-label="Notifications"
    >
      <BellIcon class="w-5 h-5" />
      {unreadCount > 0 ? (
        <span
          class="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full"
          safe
        >
          {unreadCount > 9 ? "9+" : String(unreadCount)}
        </span>
      ) : (
        ""
      )}
    </a>
  );
}
