import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { Follows } from "../types/database";
import { FollowWithUser } from "../types/relations";
import { Selectable } from "kysely";
import { loggerAll } from "../helpers/common";
import { cache, redis } from "../helpers/cache";
import userService from "./user.service";

const TABLE_NAME = "follows";
const FOLLOW_SIZE = 20;

const followUser = async (
  followerId: string,
  followingId: string,
): Promise<void> => {
  await getKnex()
    .table(TABLE_NAME)
    .insert({
      id: uuidv4(),
      follower_id: followerId,
      following_id: followingId,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .onConflict(["follower_id", "following_id"])
    .ignore();

  await invalidateFollowCaches(followerId, followingId);
};

const unfollowUser = async (
  followerId: string,
  followingId: string,
): Promise<void> => {
  await getKnex()
    .table(TABLE_NAME)
    .where("follower_id", followerId)
    .where("following_id", followingId)
    .delete();

  await invalidateFollowCaches(followerId, followingId);
};

const isFollowing = async (
  followerId: string,
  followingId: string,
): Promise<boolean> => {
  return cache(
    "follow.service.isFollowing",
    300,
    async () => {
      const row = await getKnex()
        .table<Selectable<Follows>>(TABLE_NAME)
        .where("follower_id", followerId)
        .where("following_id", followingId)
        .first();
      return !!row;
    },
    { followerId, followingId },
  );
};

const isFollowingBatch = async (
  followerId: string,
  targetUserIds: string[],
): Promise<Record<string, boolean>> => {
  if (targetUserIds.length === 0) return {};
  const rows = await getKnex()
    .table<Selectable<Follows>>(TABLE_NAME)
    .where("follower_id", followerId)
    .whereIn("following_id", targetUserIds)
    .select("following_id");
  const followed = new Set(rows.map((r) => r.following_id));
  return Object.fromEntries(targetUserIds.map((id) => [id, followed.has(id)]));
};

const getFollowers = async (
  userId: string,
  cursor?: string,
): Promise<{ items: FollowWithUser[]; nextCursor: string }> => {
  const rows = await cache(
    "follow.service.getFollowers",
    300,
    async () => {
      let query = getKnex()
        .table<Selectable<Follows>>(TABLE_NAME)
        .where("following_id", userId)
        .orderBy("created_at", "desc")
        .orderBy("id", "desc")
        .limit(FOLLOW_SIZE + 1);

      if (cursor) {
        const [timestamp, lastId] = cursor.split("_");
        query = query.where(function () {
          this.where("created_at", "<", timestamp).orWhere(function () {
            this.where("created_at", "=", timestamp).andWhere(
              "id",
              "<",
              lastId,
            );
          });
        });
      }

      return query;
    },
    { userId, cursor: cursor ?? "" },
  );

  const hasMore = rows.length > FOLLOW_SIZE;
  const items = hasMore ? rows.slice(0, FOLLOW_SIZE) : rows;

  const userIds = items.map((r) => r.follower_id);
  const users = await userService.getByIds(userIds);
  const userMap = new Map(users.map((u) => [u.id, u]));

  const followsWithUser: FollowWithUser[] = items
    .map((row) => {
      const user = userMap.get(row.follower_id);
      if (!user) return null;
      return { ...row, user };
    })
    .filter((x): x is FollowWithUser => x !== null);

  const nc = buildNextCursor(items, hasMore);
  return { items: followsWithUser, nextCursor: nc };
};

const getFollowing = async (
  userId: string,
  cursor?: string,
): Promise<{ items: FollowWithUser[]; nextCursor: string }> => {
  const rows = await cache(
    "follow.service.getFollowing",
    300,
    async () => {
      let query = getKnex()
        .table<Selectable<Follows>>(TABLE_NAME)
        .where("follower_id", userId)
        .orderBy("created_at", "desc")
        .orderBy("id", "desc")
        .limit(FOLLOW_SIZE + 1);

      if (cursor) {
        const [timestamp, lastId] = cursor.split("_");
        query = query.where(function () {
          this.where("created_at", "<", timestamp).orWhere(function () {
            this.where("created_at", "=", timestamp).andWhere(
              "id",
              "<",
              lastId,
            );
          });
        });
      }

      return query;
    },
    { userId, cursor: cursor ?? "" },
  );

  const hasMore = rows.length > FOLLOW_SIZE;
  const items = hasMore ? rows.slice(0, FOLLOW_SIZE) : rows;

  const userIds = items.map((r) => r.following_id);
  const users = await userService.getByIds(userIds);
  const userMap = new Map(users.map((u) => [u.id, u]));

  const followsWithUser: FollowWithUser[] = items
    .map((row) => {
      const user = userMap.get(row.following_id);
      if (!user) return null;
      return { ...row, user };
    })
    .filter((x): x is FollowWithUser => x !== null);

  const nc = buildNextCursor(items, hasMore);
  return { items: followsWithUser, nextCursor: nc };
};

const getFollowerCount = async (userId: string): Promise<number> => {
  return cache(
    "follow.service.getFollowerCount",
    300,
    async () => {
      const row = await getKnex()
        .table(TABLE_NAME)
        .where("following_id", userId)
        .count<{ count: string }>("id as count")
        .first();
      return Number(row?.count ?? 0);
    },
    { userId },
  );
};

const getFollowingCount = async (userId: string): Promise<number> => {
  return cache(
    "follow.service.getFollowingCount",
    300,
    async () => {
      const row = await getKnex()
        .table(TABLE_NAME)
        .where("follower_id", userId)
        .count<{ count: string }>("id as count")
        .first();
      return Number(row?.count ?? 0);
    },
    { userId },
  );
};

const getFollowingIds = async (userId: string): Promise<string[]> => {
  return cache(
    "follow.service.getFollowingIds",
    300,
    async () => {
      const rows = await getKnex()
        .table<Selectable<Follows>>(TABLE_NAME)
        .where("follower_id", userId)
        .select("following_id");
      return rows.map((r) => r.following_id);
    },
    { userId },
  );
};

const buildNextCursor = (
  items: Selectable<Follows>[],
  hasMore: boolean,
): string => {
  if (!hasMore || items.length === 0) return "";
  const last = items[items.length - 1];
  return `${new Date(last.created_at).toISOString()}_${last.id}`;
};

const invalidateFollowCaches = async (
  followerId: string,
  followingId: string,
): Promise<void> => {
  const keys = [
    `follow.service.isFollowing:followerId:${JSON.stringify(followerId)}|followingId:${JSON.stringify(followingId)}`,
    `follow.service.getFollowerCount:userId:${JSON.stringify(followingId)}`,
    `follow.service.getFollowingCount:userId:${JSON.stringify(followerId)}`,
    `follow.service.getFollowingIds:userId:${JSON.stringify(followerId)}`,
    // Invalidate first page of both lists (cursor pages expire via TTL)
    `follow.service.getFollowers:cursor:${JSON.stringify("")}|userId:${JSON.stringify(followingId)}`,
    `follow.service.getFollowing:cursor:${JSON.stringify("")}|userId:${JSON.stringify(followerId)}`,
  ];
  await Promise.all(keys.map((k) => redis.del(k)));
};

export default loggerAll(
  {
    followUser,
    unfollowUser,
    isFollowing,
    isFollowingBatch,
    getFollowers,
    getFollowing,
    getFollowerCount,
    getFollowingCount,
    getFollowingIds,
  },
  "follow.service",
);
