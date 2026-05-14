import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { FlashMessages } from "../partials/FlashMessages";
import { FormField } from "../components/forms/FormField";
import { Button } from "../components/forms/Button";
import { AuthHeading } from "../components/auth/AuthHeading";
import { AuthFormLink } from "../components/auth/AuthFormLink";
import { CsrfToken } from "../components/forms/CsrfToken";
import { Turnstile } from "../components/forms/Turnstile";

type ForgotPasswordProps = BaseProps & { csrfToken: string };

export function ForgotPassword(props: ForgotPasswordProps) {
  const { csrfToken, validation, state } = props;

  return (
    <AuthLayout {...props} useTurnstile={true}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <FlashMessages state={props.state} />
          <AuthHeading
            title="Reset your password"
            subtitle="Enter your email and we'll send you a reset link"
          />

          <form
            class="mt-8 space-y-6"
            action="/auth/forgot-password"
            method="post"
          >
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

            <Turnstile theme={props.theme} error={validation?.turnstile} />

            <Button type="submit" class="hidden turnstile-submit">
              Send reset link
            </Button>

            <AuthFormLink
              label="Remember your password?"
              href="/auth/login"
              linkText="Sign in"
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
