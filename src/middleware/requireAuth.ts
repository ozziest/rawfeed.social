// src/middleware/requireAuth.ts
import type { FastifyRequest, FastifyReply } from "fastify";

/**
 * Requires authentication. Blocks the request if req.user is not set.
 * Must be used AFTER verifyToken middleware.
 * Returns 401 for API routes or redirects to login for HTML routes.
 */
export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Check if user is authenticated
  if (!request.currentUser) {
    // Check if this is an API/HTMX request
    const isApiRequest =
      request.headers.accept?.includes("application/json") ||
      request.headers["hx-request"] === "true";

    if (isApiRequest) {
      // Return JSON error for API/HTMX requests
      return reply.code(401).send({
        error: "Unauthorized",
        message: "Authentication required",
      });
    } else {
      // Redirect to login for HTML requests
      return reply.redirect("/auth/login");
    }
  }
}
