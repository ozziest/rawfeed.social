/** @jsxImportSource @kitajs/html */
import type { Selectable } from "kysely";
import type { Users } from "../../types/database";
import { FollowButton } from "./FollowButton";

type FollowActionsProps = {
  targetUser: Selectable<Users>;
  isFollowing: boolean;
  followerCount: number;
  followingCount: number;
  csrfToken: string;
};

export function FollowActions({
  targetUser,
  isFollowing,
  followerCount,
  followingCount,
  csrfToken,
}: FollowActionsProps) {
  return (
    <>
      <FollowButton
        targetUsername={targetUser.username}
        targetUserId={targetUser.id}
        isFollowing={isFollowing}
        csrfToken={csrfToken}
      />
      <div
        id={`follow-count-${targetUser.id}`}
        hx-swap-oob="outerHTML"
        class="flex gap-6"
      >
        <a
          href={`/u/${targetUser.username}/followers`}
          class="group flex flex-col items-start"
        >
          <strong class="text-base font-bold text-gray-900 group-hover:text-black leading-none">
            {followerCount ?? 0}
          </strong>
          <span class="text-xs text-gray-500 mt-0.5">followers</span>
        </a>
        <a
          href={`/u/${targetUser.username}/following`}
          class="group flex flex-col items-start"
        >
          <strong class="text-base font-bold text-gray-900 group-hover:text-black leading-none">
            {followingCount ?? 0}
          </strong>
          <span class="text-xs text-gray-500 mt-0.5">following</span>
        </a>
      </div>
    </>
  );
}
