import Sentry from "@sentry/node";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

if (IS_PRODUCTION) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.RELEASE_VERSION,
    sendDefaultPii: false,
    tracesSampleRate: 0.01,
    sampleRate: 1,
    profilesSampleRate: 0,
    environment: process.env.NODE_ENV || "production",
    ignoreErrors: ["NotFoundError", "ValidationError"],
  });
}

export const sentryException = (
  error: Error | unknown,
  data: Record<string, unknown> = {},
) => {
  if (!IS_PRODUCTION) {
    return;
  }

  Sentry.withScope((scope) => {
    Object.keys(data).forEach((key) => {
      scope.setTag(key, data[key] as any);
    });
    Sentry.captureException(error);
  });
};
