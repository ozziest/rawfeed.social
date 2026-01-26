// src/types/fastify.d.ts
import "fastify";
import "@fastify/jwt";
import { TokenPayload } from "../helpers/tokens";

declare module "fastify" {
  interface FastifyInstance {
    jwt: {
      sign: (payload: any, options?: any) => string;
      verify: (token: string) => any;
      decode: (token: string) => any;
    };
  }

  interface FastifyRequest {
    currentUser?: TokenPayload;
  }
}
