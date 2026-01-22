import type { FastifyRequest, FastifyReply } from "fastify";
import { TokenPayload } from "../helpers/tokens";

export async function verifyToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const app = request.server;

  try {
    const accessToken = request.cookies.accessToken;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const decoded = app.jwt.verify(accessToken) as TokenPayload;

    request.currentUser = {
      userId: decoded.userId,
    };
  } catch (error) {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      request.currentUser = undefined;
      return;
    }

    try {
      const decoded = app.jwt.verify(refreshToken) as TokenPayload;

      const newAccessToken = app.jwt.sign(
        {
          userId: decoded.userId,
        },
        {
          expiresIn: "10m",
        },
      );

      reply.setCookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 10 * 60,
      });

      request.currentUser = {
        userId: decoded.userId,
      };
    } catch (refreshError) {
      request.currentUser = undefined;

      reply.clearCookie("accessToken").clearCookie("refreshToken");
    }
  }
}
