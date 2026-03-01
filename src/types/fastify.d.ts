// src/types/fastify.d.ts
import "fastify";
import "@fastify/jwt";
import "@fastify/csrf-protection";
import { TokenPayload } from "../helpers/tokens";
import { Users } from "./database";
import { CookieSerializeOptions } from "@fastify/cookie";

declare module "fastify" {
  interface FastifyInstance {
    jwt: {
      sign: (payload: any, options?: any) => string;
      verify: (token: string) => any;
      decode: (token: string) => any;
    };
    csrfProtection(
      req: FastifyRequest,
      reply: FastifyReply,
      done: () => void,
    ): void;
  }

  interface FastifyRequest {
    mode: "root" | "custom";
    domainUser?: Users;
    loggedUser?: TokenPayload;
    profileUser?: Users;
  }

  interface FastifyReply {
    generateCsrf(
      options?: CookieSerializeOptions & { userInfo?: string },
    ): string;
  }
}
