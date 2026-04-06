import { FastifyInstance } from "fastify";
import { useViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import { AboutPage } from "../views/About";

const useCtx = useViews();

export default async function aboutRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/about",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      return html(<AboutPage {...base()} />);
    },
  );
}
