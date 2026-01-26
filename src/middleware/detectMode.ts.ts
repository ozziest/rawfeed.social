import { FastifyRequest, FastifyReply } from "fastify";
import userService from "../services/user.service";

const ROOT_DOMAINS = ["localhost", "rawfeed.social"];

export async function detectMode(request: FastifyRequest, reply: FastifyReply) {
  const hostname = request.hostname;

  if (ROOT_DOMAINS.includes(hostname) || hostname.endsWith(`.rawfeed.social`)) {
    request.mode = "root";
    return;
  }

  const user = await userService.getByCustomDomain(hostname);

  if (user && user.domain_verification_status === "verified") {
    request.mode = "custom";
    request.domainUser = user;
  }
}
