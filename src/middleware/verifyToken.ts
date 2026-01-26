import type { FastifyRequest, FastifyReply } from "fastify";
import { generateTokens, TokenPayload } from "../helpers/tokens";
import userService from "../services/user.service";

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

    request.loggedUser = decoded as TokenPayload;
  } catch (error) {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      request.loggedUser = undefined;
      return;
    }

    try {
      const decoded = app.jwt.verify(refreshToken) as TokenPayload;
      const user = await userService.getById(decoded.userId);

      if (!user) {
        throw new Error("The user not found");
      }

      const payload = {
        userId: decoded.userId,
        username: user.username,
        name: user.name,
      };

      const { accessToken: newAccessToken } = generateTokens(app, payload);

      reply.setCookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 10 * 60,
      });

      request.loggedUser = payload;
    } catch (refreshError) {
      request.loggedUser = undefined;

      reply.clearCookie("accessToken").clearCookie("refreshToken");
    }
  }
}
