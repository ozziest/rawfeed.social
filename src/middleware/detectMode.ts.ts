import { FastifyRequest, FastifyReply } from "fastify";
import userService from "../services/user.service";
import { DEFAULT_USERNAME_SCHEMA } from "../helpers/validations";

const ROOT_DOMAINS = ["localhost", "rawfeed.social"];

export async function detectMode(request: FastifyRequest, reply: FastifyReply) {
  // This is the default mode all the time
  request.mode = "root";

  const hostname = request.hostname;
  if (ROOT_DOMAINS.includes(hostname)) {
    return;
  }

  console.log("hostname", hostname);

  // Checking subdomain (e.g. ozgur.rawfeed.social)
  if (hostname.endsWith(`.rawfeed.social`)) {
    const username = hostname.replace(`.rawfeed.social`, "");
    const parsed = DEFAULT_USERNAME_SCHEMA.safeParse(username);
    if (!parsed.success) {
      return;
    }
    const user = await userService.getByUsername(parsed.data);
    if (user) {
      request.mode = "custom";
      request.domainUser = user;
    }
    return;
  }

  // Checking custom domain
  const user = await userService.getByCustomDomain(hostname);
  if (user && user.domain_verification_status === "verified") {
    request.mode = "custom";
    request.domainUser = user;
  }
}
