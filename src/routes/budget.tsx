import { FastifyInstance } from "fastify";
import { useJsxViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import { BudgetPage } from "../views/Budget";

const useCtx = useJsxViews();

export default async function budgetRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/budget",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      return html(<BudgetPage {...base()} />);
    },
  );
}
