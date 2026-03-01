import type { FastifyRequest, FastifyReply } from "fastify";

export async function shouldBeAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (!request.loggedUser || !request.loggedUser?.isAdmin) {
    reply.status(401).send("Unauthorized");
  }
}
