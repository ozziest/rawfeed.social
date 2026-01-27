import { FastifyReply, FastifyRequest } from "fastify";
import { sanitize } from "./security";
import { getGravatarUrl } from "./common";

type UseViewsOptions = {
  prefix: string;
  layout: string;
};

export const useViews = (options: UseViewsOptions) => {
  const { prefix, layout } = options;

  return (request: FastifyRequest, reply: FastifyReply) => {
    const view = (name: string, params: object = {}) => {
      const validation = getFlash("validation");

      return reply.view(
        `${prefix}/${name}`,
        {
          title: "rawfeed.social",
          validation: validation || {},
          formData: {},
          mode: request.mode,
          domainUser: request.domainUser,
          loggedUser: request.loggedUser,
          profileUser: request.profileUser,
          sanitize,
          getGravatarUrl,
          ...params,
        },
        {
          layout,
        },
      );
    };

    const getFlash = (name: string): object | undefined => {
      const content = request.cookies[name];
      let data;

      if (content) {
        data = JSON.parse(content);
        reply.clearCookie(name, { path: "/" });
      }

      return data;
    };

    const setFlash = (name: string, data: object) => {
      reply.setCookie(name, JSON.stringify(data), {
        path: "/",
        httpOnly: true,
        maxAge: 3600,
      });
    };

    const setValidation = (data: object) => {
      setFlash("validation", data);
    };

    const setAuthTokens = (accessToken: string, refreshToken: string) => {
      reply.setCookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 10 * 60, // 10 minutes
      });

      reply.setCookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });
    };

    return {
      view,
      getFlash,
      setFlash,
      setValidation,
      setAuthTokens,
    };
  };
};
