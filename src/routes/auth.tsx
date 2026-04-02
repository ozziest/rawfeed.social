import { FastifyInstance } from "fastify";
import userService from "../services/user.service";
import {
  LOGIN_SCHEMA,
  REGISTER_SCHEMA,
  validate,
} from "../helpers/validations";
import { useJsxViews } from "../helpers/useViews";
import { LoginInput, RegisterInput } from "../helpers/dtos";
import bcrypt from "bcrypt";
import { generateTokens } from "../helpers/tokens";
import { getAvatar } from "../helpers/common";
import { sendVerificationEmail } from "../services/email.service";
import { Login } from "../views/auth/Login";
import { Register } from "../views/auth/Register";
import { RegistrationSuccess } from "../views/auth/RegistrationSuccess";
import { VerificationError } from "../views/auth/VerificationError";
import { VerificationSuccess } from "../views/auth/VerificationSuccess";
import { verifyTurnstile } from "../helpers/turnstile";

const useCtx = useJsxViews();

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/auth/register", async (request, reply) => {
    const { html, base } = useCtx(request, reply);
    return html(
      <Register
        {...base()}
        csrfToken={reply.generateCsrf()}
        title="Register — Rawfeed"
        description="Create your rawfeed.social account"
      />,
    );
  });

  fastify.get("/auth/registration-success", async (request, reply) => {
    const { html, base } = useCtx(request, reply);
    return html(
      <RegistrationSuccess
        {...base()}
        title="Registration Successful — Rawfeed"
        description="Check your email to verify your account"
      />,
    );
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
      const { html, base } = useCtx(request, reply);

      if (!token) {
        return html(
          <VerificationError
            {...base()}
            errorMessage="Invalid verification link"
            title="Verification Failed — Rawfeed"
            description="Email verification failed"
          />,
        );
      }

      const user = await userService.getByVerificationToken(token);

      if (!user) {
        return html(
          <VerificationError
            {...base()}
            errorMessage="Invalid or expired verification link"
            title="Verification Failed — Rawfeed"
            description="Email verification failed"
          />,
        );
      }

      if (
        user.email_verification_token_expires_at &&
        new Date(user.email_verification_token_expires_at) < new Date()
      ) {
        return html(
          <VerificationError
            {...base()}
            errorMessage="Verification link has expired"
            title="Verification Failed — Rawfeed"
            description="Email verification link has expired"
          />,
        );
      }

      await userService.verifyEmail(user.id);

      return html(
        <VerificationSuccess
          {...base()}
          title="Email Verified — Rawfeed"
          description="Your email has been verified"
        />,
      );
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
      const { setValidation, setState } = useCtx(request, reply);

      const input = request.body as RegisterInput;
      const cfTurnstileToken = input["cf-turnstile-response"];
      setState(input);

      const validation = validate(REGISTER_SCHEMA, request.body);
      if (validation.isNotValid) {
        setValidation(validation.errors);
        return reply.redirect("/auth/register");
      }

      const verified = await verifyTurnstile(cfTurnstileToken, request.ip);
      if (!verified) {
        setValidation({ turnstile: "The Cloudflare check wasn't valid." });
        return reply.redirect("/auth/register");
      }

      const normalizedUsername = input.username.trim().toLowerCase();
      const normalizedEmail = input.email.trim().toLowerCase();

      const existingUsername =
        await userService.getByUsername(normalizedUsername);
      if (existingUsername) {
        setValidation({ username: "This username is already taken" });
        return reply.redirect("/auth/register");
      }

      const existingEmail = await userService.getByEmail(normalizedEmail);
      if (existingEmail) {
        setValidation({ email: "This email is already registered" });
        return reply.redirect("/auth/register");
      }

      const { verificationToken } = await userService.insert({
        ...input,
        username: normalizedUsername,
        email: normalizedEmail,
      });

      const baseUrl = process.env.APP_URL || "https://rawfeed.social";
      const verificationUrl = `${baseUrl}/auth/verify-email?token=${verificationToken}`;

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
    const { html, base } = useCtx(request, reply);
    return html(
      <Login
        {...base()}
        csrfToken={reply.generateCsrf()}
        title="Sign In — Rawfeed"
        description="Sign in to your rawfeed.social account"
      />,
    );
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
      const { setValidation, setState, setAuthTokens } = useCtx(request, reply);

      const input = request.body as LoginInput;
      const cfTurnstileToken = input["cf-turnstile-response"];
      setState(input);

      const validation = validate(LOGIN_SCHEMA, input);
      if (validation.isNotValid) {
        setValidation(validation.errors);
        return reply.redirect("/auth/login");
      }

      const verified = await verifyTurnstile(cfTurnstileToken, request.ip);
      if (!verified) {
        setValidation({ turnstile: "The Cloudflare check wasn't valid." });
        return reply.redirect("/auth/login");
      }

      const normalizedEmail = input.email.trim().toLowerCase();

      const user = await userService.getByEmail(normalizedEmail);
      if (!user) {
        setValidation({ email: "User not found" });
        return reply.redirect("/auth/login");
      }

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
        isAdmin: !!user.is_admin,
      });

      setAuthTokens(accessToken, refreshToken);

      return reply.redirect("/");
    },
  );
}
