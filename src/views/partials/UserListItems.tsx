import type { FollowWithUser } from "../../types/relations";
import type { TokenPayload } from "../../helpers/tokens";
import { UserCard } from "./UserCard";

type UserListItemsProps = {
  items: FollowWithUser[];
  loggedUser?: TokenPayload;
  isFollowingMap?: Record<string, boolean>;
  csrfToken: string;
  listRoute: string;
  nextCursor?: string | null;
};

export function UserListItems({
  items,
  loggedUser,
  isFollowingMap,
  csrfToken,
  listRoute,
  nextCursor,
}: UserListItemsProps) {
  return (
    <>
      {items.map((follow) => (
        <UserCard
          cardUser={follow.user}
          loggedUser={loggedUser}
          isFollowing={
            isFollowingMap ? !!isFollowingMap[follow.user.id] : false
          }
          csrfToken={csrfToken}
        />
      ))}
      {nextCursor ? (
        <div
          hx-get={`${listRoute}${nextCursor}`}
          hx-trigger="intersect once"
          hx-swap="outerHTML"
          class="h-20 flex items-center justify-center"
        >
          <div class="animate-pulse text-gray-500">Loading more...</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
