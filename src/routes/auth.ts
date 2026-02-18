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
import { getAvatar } from "../helpers/common";
import { sendVerificationEmail } from "../services/email.service";

const useAuthContext = (request: FastifyRequest, reply: FastifyReply) => {
  const views = useViews({ prefix: "/auth", layout: "layouts/auth.ejs" });
  return views(request, reply);
};

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/auth/register", async (request, reply) => {
    const { view } = useAuthContext(request, reply);
    return view("register", {
      csrfToken: reply.generateCsrf(),
    });
  });

  fastify.get("/auth/registration-success", async (request, reply) => {
    const { view } = useAuthContext(request, reply);
    return view("registration-success");
  });

  fastify.get(
    "/auth/verify-email",
    {
      config: {
        rateLimit: {
          max: 3,
          timeWindow: "30 minutes",
        },
      },
    },
    async (request, reply) => {
      const { token } = request.query as { token: string };
      const { view } = useAuthContext(request, reply);

      if (!token) {
        return view("verification-error", {
          errorMessage: "Invalid verification link",
        });
      }

      const user = await userService.getByVerificationToken(token);

      if (!user) {
        return view("verification-error", {
          errorMessage: "Invalid or expired verification link",
        });
      }

      // Check if token is expired
      if (
        user.email_verification_token_expires_at &&
        new Date(user.email_verification_token_expires_at) < new Date()
      ) {
        return view("verification-error", {
          errorMessage: "Verification link has expired",
        });
      }

      // Verify the email
      await userService.verifyEmail(user.id);

      return view("verification-success");
    },
  );

  fastify.post(
    "/auth/register",
    {
      preHandler: fastify.csrfProtection,
      config: {
        rateLimit: {
          max: 15,
          timeWindow: "30 minutes",
        },
      },
    },
    async (request, reply) => {
      const { setValidation, setState } = useAuthContext(request, reply);

      const input = request.body as RegisterInput;
      setState(input);

      const validation = validate(REGISTER_SCHEMA, request.body);
      if (validation.isNotValid) {
        setValidation(validation.errors);
        return reply.redirect("/auth/register");
      }

      // Normalize username and email
      const normalizedUsername = input.username.trim().toLowerCase();
      const normalizedEmail = input.email.trim().toLowerCase();

      // Check if username already exists
      const existingUsername =
        await userService.getByUsername(normalizedUsername);
      if (existingUsername) {
        setValidation({
          username: "This username is already taken",
        });
        return reply.redirect("/auth/register");
      }

      // Check if email already exists
      const existingEmail = await userService.getByEmail(normalizedEmail);
      if (existingEmail) {
        setValidation({
          email: "This email is already registered",
        });
        return reply.redirect("/auth/register");
      }

      const { verificationToken } = await userService.insert({
        ...input,
        username: normalizedUsername,
        email: normalizedEmail,
      });

      const baseUrl = process.env.APP_URL || "https://rawfeed.social";
      const verificationUrl = `${baseUrl}/auth/verify-email?token=${verificationToken}`;

      // Send verification email
      await sendVerificationEmail(
        normalizedEmail,
        normalizedUsername,
        verificationUrl,
      );

      return reply.redirect("/auth/registration-success");
    },
  );

  fastify.get("/auth/logout", async (request, reply) => {
    reply.clearCookie("accessToken");
    reply.clearCookie("refreshToken");
    return reply.redirect("/");
  });

  fastify.get("/auth/login", async (request, reply) => {
    const { view } = useAuthContext(request, reply);
    return view("login", {
      csrfToken: reply.generateCsrf(),
    });
  });

  fastify.post(
    "/auth/login",
    {
      preHandler: fastify.csrfProtection,
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "30 minutes",
        },
      },
    },
    async (request, reply) => {
      const { setValidation, setState, setAuthTokens } = useAuthContext(
        request,
        reply,
      );

      const input = request.body as LoginInput;
      setState(input);

      const validation = validate(LOGIN_SCHEMA, input);
      if (validation.isNotValid) {
        setValidation(validation.errors);
        return reply.redirect("/auth/login");
      }

      // Normalize email
      const normalizedEmail = input.email.trim().toLowerCase();

      const user = await userService.getByEmail(normalizedEmail);
      if (!user) {
        setValidation({ email: "User not found" });
        return reply.redirect("/auth/login");
      }

      // Check if email is verified
      if (user.email_verification_token !== null) {
        setValidation({ email: "User not found" });
        return reply.redirect("/auth/login");
      }

      const isValid = await bcrypt.compare(input.password, user.password);
      if (!isValid) {
        setValidation({ email: "User not found" });
        return reply.redirect("/auth/login");
      }

      const { accessToken, refreshToken } = generateTokens(fastify, {
        userId: user.id,
        username: user.username,
        name: user.name,
        gravatar: getAvatar(user),
      });

      setAuthTokens(accessToken, refreshToken);

      return reply.redirect("/");
    },
  );
}
