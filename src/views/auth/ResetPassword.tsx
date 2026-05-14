import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { FlashMessages } from "../partials/FlashMessages";
import { FormField } from "../components/forms/FormField";
import { Button } from "../components/forms/Button";
import { AuthHeading } from "../components/auth/AuthHeading";
import { CsrfToken } from "../components/forms/CsrfToken";
import { Turnstile } from "../components/forms/Turnstile";

type ResetPasswordProps = BaseProps & { csrfToken: string; token: string };

export function ResetPassword(props: ResetPasswordProps) {
  const { csrfToken, token, validation } = props;

  return (
    <AuthLayout {...props} useTurnstile={true}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <FlashMessages state={props.state} />
          <AuthHeading
            title="Set a new password"
            subtitle="Choose a strong password for your account"
          />

          <form
            class="mt-8 space-y-6"
            action="/auth/reset-password"
            method="post"
          >
            <CsrfToken token={csrfToken} />
            <input type="hidden" name="token" value={token} />

            <FormField
              id="password"
              name="password"
              type="password"
              label="New password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              error={validation?.password}
            />

            <FormField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm new password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              error={validation?.confirmPassword}
            />

            <Turnstile theme={props.theme} error={validation?.turnstile} />

            <Button type="submit" class="hidden turnstile-submit">
              Set new password
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
