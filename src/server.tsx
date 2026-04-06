import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import "./sentry";
import path from "path";
import Fastify from "fastify";
import kitaHtmlPlugin from "@kitajs/fastify-html-plugin";
import fastifyStatic from "@fastify/static";
import routes from "./routes/index";
import compress from "@fastify/compress";
import fastifyFormbody from "@fastify/formbody";
import authRoutes from "./routes/auth";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import postRoutes from "./routes/post";
import userRoutes from "./routes/user";
import helmet from "@fastify/helmet";
import metricsPlugin from "fastify-metrics";
import rateLimit from "@fastify/rate-limit";
import csrf from "@fastify/csrf-protection";
import Sentry from "@sentry/node";
import { detectMode } from "./middleware/detectMode.ts";
import fs from "fs/promises";
import {
  initializeRSSScheduler,
  shutdownRSSScheduler,
} from "./scheduler/rss-scheduler";
import { initializeExportWorker } from "./scheduler/export-worker";
import { initializeSitemapScheduler } from "./scheduler/sitemap-scheduler";
import redirectRoutes from "./routes/redirect";
import exploreRoutes from "./routes/explore";
import tagsRoutes from "./routes/tags";
import legalRoutes from "./routes/legal";
import aboutRoutes from "./routes/about";
import blogRoutes from "./routes/blog";
import budgetRoutes from "./routes/budget";
import blogService from "./services/blog.service";
import sitemapRoutes from "./routes/sitemap";
import followRoutes from "./routes/follow";
import { timer } from "./helpers/timer";
import { asset } from "./helpers/asset";
import { getThemeFromCookies } from "./helpers/common";
import { NotFound } from "./views/NotFound";
import { ErrorPage } from "./views/ErrorPage";
import { ErrorDev } from "./views/ErrorDev";
import { TooManyRequests } from "./views/TooManyRequests";
import { verifyToken } from "./middleware/verifyToken";
import { requireAuth } from "./middleware/requireAuth";
import { shouldBeAdmin } from "./middleware/shouldBeAdmin";
import { IS_DEVELOPMENT } from "./consts";
import { register } from "./metrics";

const isTest = process.env.NODE_ENV === "test";
const assetBaseUrl = (process.env.ASSET_BASE_URL || "").replace(/\/$/, "");

const server = Fastify({ logger: false, trustProxy: true });

Sentry.setupFastifyErrorHandler(server);

server.register(metricsPlugin, {
  defaultMetrics: { enabled: true, register },
  routeMetrics: {
    enabled: true,
    registeredRoutesOnly: true,
    routeBlacklist: ["/xmetrics"],
    overrides: {
      histogram: {
        name: "http_request_duration_seconds",
        buckets: [0.01, 0.05, 0.1, 0.5, 1, 3, 5, 10],
        registers: [register],
      },
      summary: {
        name: "http_request_summary_seconds",
        registers: [register],
      },
    },
  },
  endpoint: null,
});

server.get("/xmetrics", async (request, reply) => {
  const auth = request.headers.authorization;
  if (!IS_DEVELOPMENT && auth !== `Bearer ${process.env.METRICS_TOKEN}`) {
    return reply.code(401).send({ error: "Unauthorized" });
  }
  reply.header("Content-Type", register.contentType);
  return register.metrics();
});

// Register cookie and formbody BEFORE csrf
server.register(cookie, {
  secret: process.env.APP_SECRET!,
});
server.register(fastifyFormbody);

// Now register CSRF protection
server.register(csrf, {
  cookieOpts: {
    signed: true,
    httpOnly: true,
    sameSite: "lax",
  },
});
server.register(helmet, {
  contentSecurityPolicy: IS_DEVELOPMENT
    ? false
    : {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            ...(assetBaseUrl ? [assetBaseUrl] : []),
          ],
          scriptSrc: [
            "'self'",
            "https://cloud.umami.is",
            "https://challenges.cloudflare.com",
            ...(assetBaseUrl ? [assetBaseUrl] : []),
          ],
          imgSrc: [
            "'self'",
            "data:",
            "https://www.gravatar.com",
            "https://api.producthunt.com",
            ...(assetBaseUrl ? [assetBaseUrl] : []),
          ],
          connectSrc: [
            "'self'",
            "https://cloud.umami.is",
            "https://api-gateway.umami.dev",
            "https://challenges.cloudflare.com",
          ],
          fontSrc: ["'self'", ...(assetBaseUrl ? [assetBaseUrl] : [])],
          objectSrc: ["'none'"],
          mediaSrc: ["'none'"],
          frameSrc: ["https://challenges.cloudflare.com"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
        },
      },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: {
    policy: IS_DEVELOPMENT ? "cross-origin" : "same-origin",
  },
});
server.register(rateLimit, {
  max: 1000,
  timeWindow: "15 minutes",
});
server.register(kitaHtmlPlugin);
server.register(jwt, {
  secret: process.env.JWT_SECRET!,
});
server.get(
  "/metrics",
  { preHandler: [verifyToken, requireAuth, shouldBeAdmin] },
  async (request, reply) => {
    reply.type("text/html");
    return timer.getHtml();
  },
);
server.addHook("onRequest", async (request, reply) => {
  const routeName = `${request.method} ${request.url}`;
  timer.start(routeName);

  reply.raw.on("finish", () => {
    timer.end(routeName);
  });
});

server.register(fastifyStatic, {
  root: path.join(process.cwd(), "public"),
  prefix: "/public/",
  decorateReply: false,
});

server.get(
  "/robots.txt",
  {
    config: {
      rateLimit: {
        max: 10,
        timeWindow: "30 minutes",
      },
    },
  },
  async (request, reply) => {
    const robotsPath = path.join(__dirname, "../public/robots.txt");
    const content = await fs.readFile(robotsPath, "utf-8");

    reply.type("text/plain");
    return content;
  },
);

server.register(compress, {
  global: true,
  threshold: 1024,
  encodings: ["gzip", "deflate"],
});

server.addHook("onRequest", detectMode);
server.register(sitemapRoutes);
server.register(routes);
server.register(redirectRoutes);
server.register(authRoutes);
server.register(userRoutes);
server.register(postRoutes);
server.register(followRoutes);
server.register(exploreRoutes);
server.register(tagsRoutes);
server.register(legalRoutes);
server.register(aboutRoutes);
server.register(blogRoutes);
server.register(budgetRoutes);

server.setErrorHandler((error: any, request, reply) => {
  request.log.error(error);

  const statusCode = error.statusCode || 500;

  if (request.headers.accept?.includes("application/json")) {
    return reply.code(statusCode).send({
      error: error.name || "Error",
      message: error.message,
      statusCode,
    });
  }

  if (statusCode === 429) {
    const waitTime =
      error.message?.replace("Rate limit exceeded, retry in ", "").trim() ||
      "a few minutes";

    if (request.headers["hx-request"]) {
      reply.header(
        "HX-Trigger",
        JSON.stringify({
          notify: {
            type: "error",
            message: `Too many requests. Please wait ${waitTime} before trying again.`,
          },
        }),
      );
      return reply.code(429).html(<></>);
    }

    return reply
      .code(429)
      .html(
        <TooManyRequests
          waitTime={waitTime}
          isProd={process.env.NODE_ENV === "production"}
          theme={getThemeFromCookies(request.cookies)}
        />,
      );
  }

  if (process.env.NODE_ENV !== "production") {
    return reply
      .code(statusCode)
      .html(
        <ErrorDev
          asset={asset}
          error={{ message: error.message, stack: error.stack, statusCode }}
        />,
      );
  }

  return reply
    .code(statusCode)
    .html(
      <ErrorPage
        asset={asset}
        statusCode={statusCode}
        theme={getThemeFromCookies(request.cookies)}
        message={
          statusCode === 500
            ? "Something went wrong on our end. Please try again later."
            : error.message
        }
      />,
    );
});

server.setNotFoundHandler((request, reply) => {
  if (request.headers.accept?.includes("application/json")) {
    return reply.code(404).send({
      error: "Not Found",
      message: "Route not found",
      statusCode: 404,
    });
  }

  return reply
    .code(404)
    .html(
      <NotFound asset={asset} theme={getThemeFromCookies(request.cookies)} />,
    );
});

const start = async () => {
  try {
    const port = Number(process.env.APP_PORT) || 3000;
    await server.listen({ port, host: "0.0.0.0" });

    if (!isTest) {
      blogService.clearCache();

      initializeRSSScheduler();
      initializeExportWorker();
      initializeSitemapScheduler();
    }

    server.log.info(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

const shutdown = async (signal: string) => {
  server.log.info(`Received ${signal}, shutting down gracefully`);
  await shutdownRSSScheduler();
  await server.close();
  process.exit(0);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

start();
