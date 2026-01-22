// src/types/fastify.d.ts
import "fastify";
import "@fastify/jwt";

declare module "fastify" {
  interface FastifyInstance {
    jwt: {
      sign: (payload: any, options?: any) => string;
      verify: (token: string) => any;
      decode: (token: string) => any;
    };
  }

  interface FastifyRequest {
    currentUser?: {
      userId: string;
    };
  }
}
