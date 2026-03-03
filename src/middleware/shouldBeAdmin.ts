import type { FastifyRequest, FastifyReply } from "fastify";

export async function shouldBeAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (!request.loggedUser || !request.loggedUser?.isAdmin) {
    return reply.status(403).send("Forbidden");
  }
}
