import { FastifyReply, FastifyRequest } from "fastify";
import { sanitize } from "./security";
import { getAvatar, toISO, getThemeFromCookies } from "./common";
import { asset } from "./asset";

// ---------------------------------------------------------------------------
// Shared base props injected into every JSX view
// ---------------------------------------------------------------------------
export const getBaseProps = (request: FastifyRequest, reply: FastifyReply) => {
  const getFlashRaw = (name: string): object | undefined => {
    const content = request.cookies[name];
    if (content) {
      const data = JSON.parse(content);
      reply.clearCookie(name, { path: "/" });
      return data;
    }
  };

  return {
    title:
      "Rawfeed - Chronological Microblogging Without Algorithmic Manipulation",
    description:
      "Rawfeed is an open-source microblogging platform with chronological feeds, no algorithmic manipulation, and full RSS integration.",
    keywords:
      "microblogging, chronological feed, RSS, open-source, social network, no algorithm, rawfeed",
    validation: (getFlashRaw("validation") as Record<string, string>) ?? {},
    state: (getFlashRaw("state") as Record<string, unknown>) ?? {},
    formData: {} as Record<string, unknown>,
    mode: request.mode,
    domainUser: request.domainUser,
    loggedUser: request.loggedUser,
    profileUser: request.profileUser,
    activeHashtag: "",
    isProd: process.env.NODE_ENV === "production",
    theme: getThemeFromCookies(request.cookies),
    sanitize,
    getAvatar,
    toISO,
    asset,
  };
};

// ---------------------------------------------------------------------------
// JSX view helper — call reply.html() with a JSX component.
// Flash cookies (validation, state) are consumed through getBaseProps.
// ---------------------------------------------------------------------------
export const useJsxViews = () => {
  return (request: FastifyRequest, reply: FastifyReply) => {
    const base = () => getBaseProps(request, reply);

    const html = (component: JSX.Element) => {
      return reply.html(component);
    };

    const setFlash = (name: string, data: object) => {
      reply.setCookie(name, JSON.stringify(data), {
        path: "/",
        httpOnly: true,
        maxAge: 3600,
      });
    };

    const setValidation = (errors: object) => setFlash("validation", errors);
    const setState = (state: object) => setFlash("state", state);

    const setAuthTokens = (accessToken: string, refreshToken: string) => {
      reply.setCookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 10 * 60,
      });
      reply.setCookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
    };

    const notify = (message: string, type: "error" | "success" = "error") => {
      reply.header("HX-Trigger", JSON.stringify({ notify: { type, message } }));
    };

    return {
      html,
      base,
      setFlash,
      setValidation,
      setState,
      setAuthTokens,
      notify,
    };
  };
};
