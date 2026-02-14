import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { useViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";

const useLegalContext = (request: FastifyRequest, reply: FastifyReply) => {
  const views = useViews({ prefix: "", layout: "layouts/default.ejs" });
  return views(request, reply);
};

export default async function legalRoutes(fastify: FastifyInstance) {
  // Privacy Policy
  fastify.get(
    "/legal/privacy",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { view } = useLegalContext(request, reply);
      return view("legal/privacy.ejs");
    },
  );

  // Terms of Service
  fastify.get(
    "/legal/terms",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { view } = useLegalContext(request, reply);
      return view("legal/terms.ejs");
    },
  );

  // Cookie Policy
  fastify.get(
    "/legal/cookies",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { view } = useLegalContext(request, reply);
      return view("legal/cookies.ejs");
    },
  );

  // Data Subject Rights
  fastify.get(
    "/legal/data-rights",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { view } = useLegalContext(request, reply);
      return view("legal/data-rights.ejs");
    },
  );

  // Bot Account Disclosure
  fastify.get(
    "/legal/bots",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { view } = useLegalContext(request, reply);
      return view("legal/bots.ejs");
    },
  );

  // Data Processing Agreement
  fastify.get(
    "/legal/dpa",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { view } = useLegalContext(request, reply);
      return view("legal/dpa.ejs");
    },
  );
}
