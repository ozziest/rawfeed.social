import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { useViews, getBaseProps } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import { TermsPage } from "../views/legal/Terms";
import { PrivacyPage } from "../views/legal/Privacy";
import { CookiesPage } from "../views/legal/Cookies";
import { DataRightsPage } from "../views/legal/DataRights";
import { DPAPage } from "../views/legal/DPA";
import { BotsLegalPage } from "../views/legal/Bots";
import { DMCAPage } from "../views/legal/DMCA";

const useCtx = useViews();

export default async function legalRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/legal/privacy",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      return html(<PrivacyPage {...base()} />);
    },
  );

  fastify.get(
    "/legal/terms",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      return html(<TermsPage {...base()} />);
    },
  );

  fastify.get(
    "/legal/cookies",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      return html(<CookiesPage {...base()} />);
    },
  );

  fastify.get(
    "/legal/data-rights",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      return html(<DataRightsPage {...base()} />);
    },
  );

  fastify.get(
    "/legal/bots",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      return html(<BotsLegalPage {...base()} />);
    },
  );

  fastify.get(
    "/legal/dpa",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      return html(<DPAPage {...base()} />);
    },
  );

  fastify.get(
    "/legal/dmca",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      return html(<DMCAPage {...base()} />);
    },
  );
}
