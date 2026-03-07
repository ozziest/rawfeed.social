import { UserStatLink } from "./UserStatLink";

type FollowStatsProps = {
  userId: string;
  username: string;
  followerCount: number;
  followingCount: number;
};

export function FollowStats({
  userId,
  username,
  followerCount,
  followingCount,
}: FollowStatsProps) {
  return (
    <div
      id={`follow-count-${userId}`}
      hx-swap-oob="outerHTML"
      class="flex gap-6"
    >
      <UserStatLink
        href={`/u/${username}/followers`}
        count={followerCount}
        label="followers"
      />
      <UserStatLink
        href={`/u/${username}/following`}
        count={followingCount}
        label="following"
      />
    </div>
  );
}
