import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import "./sentry";
import path from "path";
import Fastify from "fastify";
import pointOfView from "@fastify/view";
import ejs from "ejs";
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
import rateLimit from "@fastify/rate-limit";
import csrf from "@fastify/csrf-protection";
import Sentry from "@sentry/node";
import { detectMode } from "./middleware/detectMode.ts";
import fs from "fs/promises";
import { initializeRSSScheduler } from "./scheduler/rss-scheduler";

const isDevelopment = process.env.NODE_ENV !== "production";

const server = Fastify({ logger: false, trustProxy: true });

Sentry.setupFastifyErrorHandler(server);
server.register(csrf, {
  cookieOpts: {
    signed: true,
    httpOnly: true,
    sameSite: "strict",
  },
});
server.register(helmet, {
  contentSecurityPolicy: isDevelopment
    ? false
    : {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https://www.gravatar.com"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'none'"],
          frameSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
        },
      },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: {
    policy: isDevelopment ? "cross-origin" : "same-origin",
  },
});
server.register(rateLimit, {
  max: 300,
  timeWindow: "15 minutes",
});
server.register(fastifyFormbody);
server.register(pointOfView, {
  engine: { ejs },
  root: path.join(process.cwd(), "views"),
});
server.register(cookie, {
  secret: process.env.APP_SECRET!,
});
server.register(jwt, {
  secret: process.env.JWT_SECRET!,
});

server.register(fastifyStatic, {
  root: path.join(process.cwd(), "public"),
  prefix: "/public/",
  decorateReply: false,
});

server.get("/robots.txt", async (request, reply) => {
  const robotsPath = path.join(__dirname, "../public/robots.txt");
  const content = await fs.readFile(robotsPath, "utf-8");

  reply.type("text/plain");
  return content;
});

server.register(compress, {
  global: true,
  threshold: 1024,
  encodings: ["gzip", "deflate"],
});

server.addHook("onRequest", detectMode);
server.register(routes);
server.register(authRoutes);
server.register(userRoutes);
server.register(postRoutes);

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

  if (process.env.NODE_ENV !== "production") {
    return reply.code(statusCode).view("error-dev", {
      error: {
        message: error.message,
        stack: error.stack,
        statusCode,
      },
    });
  }

  return reply.code(statusCode).view("error", {
    statusCode,
    message:
      statusCode === 500
        ? "Something went wrong on our end. Please try again later."
        : error.message,
  });
});

server.setNotFoundHandler((request, reply) => {
  if (request.headers.accept?.includes("application/json")) {
    return reply.code(404).send({
      error: "Not Found",
      message: "Route not found",
      statusCode: 404,
    });
  }

  return reply.code(404).view("404");
});

const start = async () => {
  try {
    const port = Number(process.env.APP_PORT) || 3000;
    await server.listen({ port, host: "0.0.0.0" });

    initializeRSSScheduler(isDevelopment);

    server.log.info(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
