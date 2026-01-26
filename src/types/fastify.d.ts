// src/types/fastify.d.ts
import "fastify";
import "@fastify/jwt";
import { TokenPayload } from "../helpers/tokens";
import { Users } from "./database";

declare module "fastify" {
  interface FastifyInstance {
    jwt: {
      sign: (payload: any, options?: any) => string;
      verify: (token: string) => any;
      decode: (token: string) => any;
    };
  }

  interface FastifyRequest {
    mode: "root" | "custom";
    domainUser?: Users;
    loggedUser?: TokenPayload;
    profileUser?: Users;
  }
}
