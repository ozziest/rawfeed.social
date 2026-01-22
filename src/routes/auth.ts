import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import userService from "../services/user.service";
import {
  LOGIN_SCHEMA,
  REGISTER_SCHEMA,
  validate,
} from "../helpers/validations";
import { useViews } from "../helpers/useViews";
import { LoginInput, RegisterInput } from "../helpers/dtos";
import bcrypt from "bcrypt";
import { generateTokens } from "../helpers/tokens";

const useAuthContext = (request: FastifyRequest, reply: FastifyReply) => {
  const views = useViews({ prefix: "/auth", layout: "layouts/auth.ejs" });
  return views(request, reply);
};

export default async function authRoutes(fastify: FastifyInstance) {
  // fastify.get("/auth/register", async (request, reply) => {
  //   const { view } = useAuthContext(request, reply);
  //   return view("register");
  // });

  // fastify.post("/auth/register", async (request, reply) => {
  //   const { setValidation } = useAuthContext(request, reply);

  //   const validation = validate(REGISTER_SCHEMA, request.body);
  //   if (validation.isNotValid) {
  //     setValidation(validation.errors);
  //     return reply.redirect("/auth/register");
  //   }

  //   await userService.insert(request.body as RegisterInput);

  //   return reply.redirect("/");
  // });

  fastify.get("/auth/logout", async (request, reply) => {
    reply.clearCookie("accessToken");
    reply.clearCookie("refreshToken");
    return reply.redirect("/");
  });

  fastify.get("/auth/login", async (request, reply) => {
    const { view } = useAuthContext(request, reply);
    return view("login");
  });

  fastify.post(
    "/auth/login",
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "15 minutes",
        },
      },
    },
    async (request, reply) => {
      const { setValidation, setAuthTokens } = useAuthContext(request, reply);

      const input = request.body as LoginInput;
      const validation = validate(LOGIN_SCHEMA, input);
      if (validation.isNotValid) {
        setValidation(validation.errors);
        return reply.redirect("/auth/login");
      }

      const user = await userService.getByEmail(input.email);
      if (!user) {
        return reply.redirect("/auth/login");
      }

      const isValid = await bcrypt.compare(input.password, user.password);
      if (!isValid) {
        return reply.redirect("/auth/login");
      }

      const { accessToken, refreshToken } = generateTokens(fastify, {
        userId: user.id,
      });

      setAuthTokens(accessToken, refreshToken);

      return reply.redirect("/");
    },
  );
}
