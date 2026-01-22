import Sentry from "@sentry/node";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.RELEASE_VERSION,
    sendDefaultPii: false,
    tracesSampleRate: 0.05,
    sampleRate: 0.1,
    profilesSampleRate: 0,
    environment: process.env.NODE_ENV || "production",
    ignoreErrors: ["NotFoundError", "ValidationError"],
  });
}
