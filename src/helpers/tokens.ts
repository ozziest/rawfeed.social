import type { FastifyInstance } from "fastify";

export interface TokenPayload {
  userId: string;
}

export function generateTokens(app: FastifyInstance, payload: TokenPayload) {
  const accessToken = app.jwt.sign(payload, {
    expiresIn: "10m",
  });

  const refreshToken = app.jwt.sign(payload, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
}
