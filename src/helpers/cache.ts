import * as Sentry from "@sentry/node";
import Redis from "ioredis";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = parseInt(process.env.REDIS_PORT || "6379");

const redis = new Redis({
  host: redisHost,
  port: redisPort,
});

export async function cache<T>(
  key: string,
  ttl: number,
  callback: () => Promise<T> | T,
  params?: Record<string, any>,
): Promise<T> {
  let cacheKey = key;
  if (params) {
    const paramString = Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b)) // Consistent ordering
      .map(([k, v]) => `${k}:${JSON.stringify(v)}`)
      .join("|");
    cacheKey = `${key}:${paramString}`;
  }

  const cached = await Sentry.startSpan(
    {
      name: key,
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
      name: key,
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

export { redis };
