import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import userService from "../services/user.service";
import { useViews } from "../helpers/useViews";
import { requireAuth } from "../middleware/requireAuth";

const views = useViews({ prefix: "explore", layout: "layouts/default.ejs" });

export default async function exploreRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/explore/bots",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { view } = views(request, reply);
      const users = await userService.paginateBots();

      return view("bots", {
        users,
      });
    },
  );

  fastify.get(
    "/explore/members",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { view } = views(request, reply);
      const users = await userService.paginateMembers();

      return view("bots", {
        users,
      });
    },
  );
}
