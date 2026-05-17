import type { Selectable } from "kysely";
import type { Users } from "../../../types/database";
import { getInitials, getAvatarBgClass } from "../../../helpers/common";
import { Avatar } from "./Avatar";
import { RssFeedLink } from "./RssFeedLink";
import { BotBadge } from "./BotBadge";

export type ProfileHeaderProps = {
  user: Selectable<Users>;
  showRss?: boolean;
};

export function ProfileHeader({ user, showRss = true }: ProfileHeaderProps) {
  return (
    <div class="flex items-center gap-4">
      <Avatar
        initials={getInitials(user.name, user.username)}
        bgClass={getAvatarBgClass(user.username)}
        size={80}
        className="w-20 h-20 shrink-0"
      />
      <div class="min-w-0 flex flex-col justify-center">
        <div class="flex items-center gap-2 flex-wrap min-w-0">
          <h1
            class="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight"
            safe
          >
            {user.name}
          </h1>
          {user.bot_type ? <BotBadge /> : null}
        </div>
        <p class="text-sm text-gray-400 mt-0.5">
          @<span safe>{user.username}</span>
        </p>
      </div>
      {showRss && !user.bot_type ? (
        <RssFeedLink username={user.username} />
      ) : null}
    </div>
  );
}
