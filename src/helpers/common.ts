import crypto from "crypto";
import Sentry from "@sentry/node";
import { Users } from "../types/database";
import { RSS_RESOURCES } from "../rssResources";
import { POST_SIZE } from "../consts";
import { PostWithContent } from "../types/relations";

const isDevelopment = process.env.NODE_ENV !== "production";

const getGravatarUrl = (email: string, size: number = 80): string => {
  const hash = crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");

  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};

export const getAvatar = (user: Users) => {
  if (user.bot_type === null) {
    return getGravatarUrl(user.email);
  }

  const resource = RSS_RESOURCES.find(
    (item) => item.username === user.username,
  );
  if (resource) {
    return resource.svg;
  }
  return "/public/images/default_avatar.svg";
};

export const logError = (
  error: Error | string | unknown,
  context?: Record<string, unknown>,
) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(error);
    if (context) {
      console.error("Context:", context);
    }
    return;
  }

  Sentry.withScope((scope) => {
    scope.setLevel("error");

    if (context) {
      scope.setContext("additional", context);
    }

    if (error instanceof Error) {
      Sentry.captureException(error);
    } else {
      Sentry.captureMessage(error as string, "error");
    }
  });
};

export const toISO = (date: string) => {
  return new Date(date).toISOString();
};

export function logger<T extends (...args: any[]) => any>(
  fn: T,
  name?: string,
): T {
  const functionName = name || fn.name || "anonymous";

  const logResult = (duration: number, isError = false) => {
    if (!isDevelopment) {
      return;
    }

    const durationStr = duration.toFixed(2);
    let color = "\x1b[32m"; // green

    if (duration > 30) {
      color = "\x1b[38;5;208m"; // orange
    } else if (duration > 10) {
      color = "\x1b[33m"; // yellow
    }

    const reset = "\x1b[0m";
    const errorSuffix = isError ? " (error)" : "";

    console.log(
      `${color}${functionName}: ${durationStr}ms${errorSuffix}${reset}`,
    );
  };

  return ((...args: any[]) => {
    const startTime = performance.now();
    const result = fn(...args);

    if (result instanceof Promise) {
      return result
        .then((data) => {
          logResult(performance.now() - startTime);
          return data;
        })
        .catch((error) => {
          throw error;
        });
    }

    logResult(performance.now() - startTime);
    return result;
  }) as T;
}

export function loggerAll<T extends Record<string, any>>(
  fns: T,
  prefix: string,
): T {
  return Object.keys(fns).reduce((acc, key) => {
    acc[key as keyof T] = logger(fns[key], `${prefix}.${key}`); // ← Prefix ekle
    return acc;
  }, {} as T);
}

export const nextCursor = (posts: PostWithContent[]) => {
  const hasMore = posts.length === POST_SIZE;

  if (!hasMore || posts.length === 0) {
    return null;
  }

  const lastPost = posts[posts.length - 1];

  const timestamp =
    lastPost.created_at instanceof Date
      ? lastPost.created_at.toISOString()
      : new Date(lastPost.created_at!).toISOString();

  return `${timestamp}_${lastPost.id}`;
};
