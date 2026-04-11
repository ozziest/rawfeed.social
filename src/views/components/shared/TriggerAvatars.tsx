import { getAvatar } from "../../../helpers/common";
import { Avatar } from "../users/Avatar";
import type { NotificationTriggerUser } from "../../../types/relations";

type TriggerAvatarsProps = {
  users: NotificationTriggerUser[];
  max?: number;
};

export function TriggerAvatars({ users, max = 4 }: TriggerAvatarsProps) {
  const visible = users.slice(0, max);
  const overflow = users.length - visible.length;

  return (
    <div class="flex items-center -space-x-2">
      {visible.map((user) => (
        <a
          href={`/u/${user.username}`}
          title={user.name || `@${user.username}`}
          class="relative inline-block ring-2 ring-white dark:ring-gray-800 rounded-full hover:z-10 focus:z-10 transition-transform hover:scale-110"
          aria-label={`View profile of ${user.name || user.username}`}
        >
          <Avatar
            src={getAvatar(user as any)}
            alt={user.name || user.username}
            size={32}
            className="w-8 h-8"
          />
        </a>
      ))}
      {overflow > 0 ? (
        <span class="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 ring-2 ring-white dark:ring-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300">
          +{overflow}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
