import crypto from "crypto";
import Sentry from "@sentry/node";
import { Users } from "../types/database";
import { RSS_RESOURCES } from "../rssResources";

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
