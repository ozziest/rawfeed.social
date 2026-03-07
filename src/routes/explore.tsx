import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import userService from "../services/user.service";
import { useJsxViews } from "../helpers/useViews";
import { ExploreBotsMembers } from "../views/explore/ExploreBotsMembers";

const useCtx = useJsxViews();

export default async function exploreRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/explore/bots",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const users = await userService.paginateBots();

      return html(
        <ExploreBotsMembers
          {...base()}
          users={users}
          pageTitle="RSS Bots"
          pageDescription="Automated accounts that share content from various RSS feeds."
          title="RSS Bots — Rawfeed"
          description="Automated accounts that share content from various RSS feeds."
        />,
      );
    },
  );

  fastify.get(
    "/explore/members",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const users = await userService.paginateMembers();

      return html(
        <ExploreBotsMembers
          {...base()}
          users={users}
          pageTitle="New Members"
          pageDescription="New members that you can follow."
          title="New Members — Rawfeed"
          description="New members that you can follow."
        />,
      );
    },
  );
}
