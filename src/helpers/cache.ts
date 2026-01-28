import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
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

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached) as T;
  }

  const value = await callback();

  await redis.setex(cacheKey, ttl, JSON.stringify(value));

  return value;
}

export { redis };
