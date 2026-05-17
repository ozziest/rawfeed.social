import type { Selectable } from "kysely";
import type { Users } from "../../../types/database";
import { getInitials, getAvatarBgClass } from "../../../helpers/common";
import { Avatar } from "./Avatar";
import { RssSourceBadge } from "../shared/RssSourceBadge";

type BotUserCardProps = {
  user: Selectable<Users> & { rss_source?: string };
};

export function BotUserCard({ user }: BotUserCardProps) {
  return (
    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div class="flex items-start gap-3">
        <a href={`/u/${user.username}`}>
          <Avatar
            initials={getInitials(user.name, user.username)}
            bgClass={getAvatarBgClass(user.username)}
            size={48}
            className="w-12 h-12"
          />
        </a>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <a
              href={`/u/${user.username}`}
              class="font-semibold text-gray-900 dark:text-gray-100 hover:underline truncate"
              safe
            >
              {user.name || user.username}
            </a>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2" safe>
            @{user.username}
          </p>

          <div>
            {user.bio ? (
              <p
                class="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2"
                safe
              >
                {user.bio}
              </p>
            ) : undefined}
          </div>
        </div>
      </div>

      <div>
        {user.rss_source ? (
          <RssSourceBadge rssSource={user.rss_source} />
        ) : undefined}
      </div>
    </div>
  );
}
