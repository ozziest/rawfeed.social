import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { useViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";

const useAboutContext = (request: FastifyRequest, reply: FastifyReply) => {
  const views = useViews({ prefix: "", layout: "layouts/landing.ejs" });
  return views(request, reply);
};

export default async function aboutRoutes(fastify: FastifyInstance) {
  // About/Landing Page
  fastify.get(
    "/about",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { view } = useAboutContext(request, reply);
      return view("about.ejs");
    },
  );
}
