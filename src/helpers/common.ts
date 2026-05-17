import Sentry from "@sentry/node";
import { IS_DEVELOPMENT, POST_SIZE } from "../consts";
import { PostWithContent } from "../types/relations";
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

const AVATAR_PALETTE = [
  "bg-slate-500",
  "bg-zinc-600",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-sky-600",
  "bg-teal-600",
  "bg-rose-500",
  "bg-amber-600",
] as const;

export const getInitials = (name: string | null, username: string): string => {
  const source = name?.trim() || username;
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "??";
  }

  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return parts[0].slice(0, 2).toUpperCase();
};

export const getAvatarBgClass = (username: string): string => {
  const sum = [...username].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
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
