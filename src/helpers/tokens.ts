import type { FastifyInstance } from "fastify";

export interface TokenPayload {
  userId: string;
  username: string;
  name: string;
  gravatar: string;
}

export function generateTokens(app: FastifyInstance, payload: TokenPayload) {
  const accessToken = app.jwt.sign(
    {
      userId: payload.userId,
      username: payload.username,
      name: payload.name,
    },
    {
      expiresIn: "10m",
    },
  );

  const refreshToken = app.jwt.sign(
    {
      userId: payload.userId,
    },
    {
      expiresIn: "30d",
    },
  );
  return { accessToken, refreshToken };
}
