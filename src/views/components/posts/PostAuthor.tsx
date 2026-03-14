import type { Selectable } from "kysely";
import type { Users } from "../../../types/database";
import { getAvatar } from "../../../helpers/common";
import { Avatar } from "../users/Avatar";
import { BotBadge } from "../users/BotBadge";

type PostAuthorProps = {
  user: Selectable<Users>;
};

export function PostAuthor({ user }: PostAuthorProps) {
  return (
    <a
      href={`/u/${user.username}`}
      class="relative z-10 flex items-center gap-3 mb-4 w-fit group"
      aria-label={`View profile of ${user.name}`}
    >
      <Avatar
        src={getAvatar(user)}
        alt={user.name}
        size={40}
        className="w-10 h-10 group-hover:opacity-80 transition-opacity"
      />
      <div>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-900 hover:underline">
            <span safe>{user.name}</span>
          </span>
          {user.bot_type ? <BotBadge /> : null}
        </div>
        <p class="text-sm text-gray-500 hover:underline">
          @<span safe>{user.username}</span>
        </p>
      </div>
    </a>
  );
}
