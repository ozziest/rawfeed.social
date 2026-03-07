import type { Selectable } from "kysely";
import type { Users } from "../../types/database";
import { FollowButton } from "../components/users/FollowButton";
import { FollowStats } from "../components/users/FollowStats";

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
      <FollowStats
        userId={targetUser.id}
        username={targetUser.username}
        followerCount={followerCount ?? 0}
        followingCount={followingCount ?? 0}
      />
    </>
  );
}
