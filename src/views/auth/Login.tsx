import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { FlashMessages } from "../partials/FlashMessages";
import { FormField } from "../components/forms/FormField";
import { Button } from "../components/forms/Button";
import { AuthHeading } from "../components/auth/AuthHeading";
import { AuthFormLink } from "../components/auth/AuthFormLink";
import { CsrfToken } from "../components/forms/CsrfToken";
import Turnstile from "../components/forms/Turnstile";

type LoginProps = BaseProps & { csrfToken: string };

export function Login(props: LoginProps) {
  const { csrfToken, validation, state } = props;

  return (
    <AuthLayout {...props}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <FlashMessages state={props.state} />
          <AuthHeading
            title="Sign in to your account"
            subtitle="Welcome back to rawfeed.social"
          />

          <form class="mt-8 space-y-6" action="/auth/login" method="post">
            <CsrfToken token={csrfToken} />

            <FormField
              id="email"
              name="email"
              type="email"
              label="Email address"
              value={state?.email as string | undefined}
              placeholder="you@example.com"
              autoComplete="email"
              required
              error={validation?.email}
            />

            <FormField
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              error={validation?.password}
            />

            <Turnstile theme={props.theme} error={validation?.turnstile} />

            <Button type="submit" class="hidden turnstile-submit">
              Sign in
            </Button>

            <AuthFormLink
              label="Don't have an account?"
              href="/auth/register"
              linkText="Create account"
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
