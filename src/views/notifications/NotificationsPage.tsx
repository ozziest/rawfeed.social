import type { BaseProps } from "../../types/views";
import type { NotificationWithTriggers } from "../../types/relations";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { InfoNotice } from "../components/shared/InfoNotice";
import { NotificationsNext } from "./NotificationsNext";
import { MailIcon } from "../components/icons/MailIcon";

type NotificationsPageProps = BaseProps & {
  notifications: NotificationWithTriggers[];
  nextCursor: string | null;
};

export function NotificationsPage(props: NotificationsPageProps) {
  const { notifications, nextCursor } = props;

  return (
    <DefaultLayout {...props} title="Notifications — rawfeed.social">
      <div class="max-w-2xl mx-auto px-4 py-8">
        <div class="mb-6">
          <div class="flex items-center justify-between gap-4 mb-2">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Notifications
            </h1>
            <a
              href="/user/settings/notifications"
              class="shrink-0 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <MailIcon class="w-4 h-4" />
              Email settings
            </a>
          </div>
          <p class="text-gray-600 dark:text-gray-400">
            Likes, reshares, replies, and mentions from other users
          </p>
        </div>

        {notifications.length === 0 ? (
          <InfoNotice title="No notifications yet">
            When someone likes, reshares, or replies to your posts, you'll see
            it here.
          </InfoNotice>
        ) : (
          <div class="space-y-2">
            <NotificationsNext
              notifications={notifications}
              nextCursor={nextCursor}
            />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
