import type { Selectable } from "kysely";
import type { Users } from "../../../types/database";
import type { TokenPayload } from "../../../helpers/tokens";
import { getAvatar } from "../../../helpers/common";
import { FollowButton } from "./FollowButton";
import { Avatar } from "./Avatar";

type UserCardProps = {
  cardUser: Selectable<Users>;
  loggedUser?: TokenPayload;
  isFollowing: boolean;
  csrfToken: string;
};

export function UserCard({
  cardUser,
  loggedUser,
  isFollowing,
  csrfToken,
}: UserCardProps) {
  return (
    <div class="flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors">
      <a
        href={`/u/${cardUser.username}`}
        class="flex items-center gap-3 min-w-0"
      >
        <Avatar
          src={getAvatar(cardUser)}
          alt={cardUser.name}
          size={48}
          className="w-12 h-12 shrink-0"
        />
        <div class="min-w-0">
          <p
            class="font-semibold text-gray-900 dark:text-gray-100 truncate"
            safe
          >
            {cardUser.name}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
            @<span safe>{cardUser.username}</span>
          </p>
          {cardUser.bio ? (
            <p
              class="text-sm text-gray-600 dark:text-gray-400 truncate mt-0.5"
              safe
            >
              {cardUser.bio}
            </p>
          ) : (
            ""
          )}
        </div>
      </a>
      {loggedUser && loggedUser.userId !== cardUser.id ? (
        <FollowButton
          targetUsername={cardUser.username}
          targetUserId={cardUser.id}
          isFollowing={isFollowing}
          csrfToken={csrfToken}
        />
      ) : (
        ""
      )}
    </div>
  );
}
