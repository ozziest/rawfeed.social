import * as Sentry from "@sentry/node";
import Redis from "ioredis";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = parseInt(process.env.REDIS_PORT || "6379");

const redis = new Redis({
  host: redisHost,
  port: redisPort,
});

type ParamsType = Record<string, any>;

type CacheKeyPrefix =
  | "follow.service.isFollowing"
  | "follow.service.getFollowers"
  | "follow.service.getFollowing"
  | "follow.service.getFollowerCount"
  | "follow.service.getFollowingCount"
  | "follow.service.getFollowingIds"
  | "hashtag.service.getDailyReport"
  | "postDetail.services.likes"
  | "postDetail.services.links"
  | "postDetail.services.mentions"
  | "postDetail.services.hashtags"
  | "postDetail.services.getLikedPostsByUser"
  | "user.service.getByIds"
  | "user.service.getLastMembers"
  | "user.service.getLastBots"
  | "blog:getAllPosts"
  | "link.service.getAllByIds";

const toCacheKey = (key: CacheKeyPrefix, params?: ParamsType): string => {
  let cacheKey: string = key;
  if (params) {
    const paramString = Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b)) // Consistent ordering
      .map(([k, v]) => `${k}:${JSON.stringify(v)}`)
      .join("|");
    cacheKey = `${key}:${paramString}`;
  }

  return cacheKey;
};

export async function cache<T>(
  keyPrefix: CacheKeyPrefix,
  ttl: number,
  callback: () => Promise<T> | T,
  params?: Record<string, any>,
): Promise<T> {
  const cacheKey = toCacheKey(keyPrefix, params);

  const cached = await Sentry.startSpan(
    {
      name: keyPrefix,
      op: "cache.get",
      attributes: {
        "cache.key": [cacheKey],
        "network.peer.address": redisHost,
        "network.peer.port": redisPort,
      },
    },
    async (span) => {
      const result = await redis.get(cacheKey);
      const cacheHit = result !== null;
      span.setAttribute("cache.hit", cacheHit);
      if (cacheHit && result) {
        span.setAttribute("cache.item_size", result.length);
      }
      return result;
    },
  );

  if (cached) {
    return JSON.parse(cached) as T;
  }

  const value = await callback();
  const serialized = JSON.stringify(value);

  await Sentry.startSpan(
    {
      name: keyPrefix,
      op: "cache.put",
      attributes: {
        "cache.key": [cacheKey],
        "cache.item_size": serialized.length,
        "network.peer.address": redisHost,
        "network.peer.port": redisPort,
      },
    },
    async () => {
      await redis.setex(cacheKey, ttl, serialized);
    },
  );

  return value;
}

export async function bust(keyPrefix: CacheKeyPrefix): Promise<void> {
  const pattern = `${keyPrefix}*`;
  let cursor = "0";

  do {
    const [nextCursor, keys] = await redis.scan(
      cursor,
      "MATCH",
      pattern,
      "COUNT",
      "100",
    );

    if (keys.length > 0) {
      await redis.del(...keys);
    }

    cursor = nextCursor;
  } while (cursor !== "0");
}

export { redis };
