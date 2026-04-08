import crypto from "crypto";
import Sentry from "@sentry/node";
import { Selectable } from "kysely";
import { Users } from "../types/database";
import { IS_DEVELOPMENT, POST_SIZE } from "../consts";
import { PostWithContent } from "../types/relations";
import { asset } from "./asset";
import type { BaseProps } from "../types/views";
import { DEFAULT_USERNAME_SCHEMA, validate } from "./validations";

export const isViewableUsername = (username?: string): boolean => {
  if (!username) {
    return false;
  }

  const validation = validate(DEFAULT_USERNAME_SCHEMA, username);

  if (validation.isValid) {
    return true;
  }

  if (username.trim().toLowerCase().startsWith("rss_")) {
    return true;
  }

  return false;
};

export const getThemeFromCookies = (
  cookies: Record<string, string | undefined> | undefined,
): BaseProps["theme"] => {
  const value = cookies?.theme;
  if (value === "dark" || value === "light") {
    return value;
  }
  return "system";
};

const getGravatarUrl = (email: string, size: number = 400): string => {
  const hash = crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");

  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};

export const getAvatar = (user: Selectable<Users>) => {
  if (user.bot_type === null) {
    return getGravatarUrl(user.email);
  }

  if (user.bot_type === "rss") {
    return asset("/public/images/rss/rss.svg");
  }

  return asset("/public/images/default_avatar.svg");
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
