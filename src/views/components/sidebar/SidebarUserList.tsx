import { getAvatar } from "../../../helpers/common";
import type { Selectable } from "kysely";
import type { Users } from "../../../types/database";
import { Avatar } from "../users/Avatar";

export type SidebarUserListProps = {
  users: Selectable<Users>[];
  viewAllHref: string;
};

export function SidebarUserList({ users, viewAllHref }: SidebarUserListProps) {
  return (
    <>
      <div class="space-y-2">
        {users.map((user) => (
          <a
            href={`/u/${user.username}`}
            class="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 -mx-2 px-2 py-1 rounded"
          >
            <Avatar
              src={getAvatar(user)}
              alt={user.name}
              size={32}
              className="w-8 h-8"
            />
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate"
                safe
              >
                {user.name}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                @<span safe>{user.username}</span>
              </p>
            </div>
          </a>
        ))}
      </div>
      <a
        href={viewAllHref}
        class="mt-2 block text-center text-sm text-black dark:text-gray-200 hover:text-gray-700 dark:hover:text-white font-medium"
      >
        View all
      </a>
    </>
  );
}
