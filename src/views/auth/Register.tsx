import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { FlashMessages } from "../partials/FlashMessages";
import { FormField } from "../components/forms/FormField";
import { CsrfToken } from "../components/forms/CsrfToken";
import { Button } from "../components/forms/Button";
import { AuthHeading } from "../components/auth/AuthHeading";
import { AuthFormLink } from "../components/auth/AuthFormLink";
import { Checkbox } from "../components/forms/Checkbox";
import { Link } from "../components/shared/Link";
import Turnstile from "../components/forms/Turnstile";

type RegisterProps = BaseProps & { csrfToken: string };

export function Register(props: RegisterProps) {
  const { csrfToken, validation, state } = props;

  return (
    <AuthLayout {...props}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <FlashMessages state={props.state} />
          <AuthHeading
            title="Create your account"
            subtitle="Join rawfeed.social today"
          />

          <form class="mt-8 space-y-6" action="/auth/register" method="post">
            <CsrfToken token={csrfToken} />

            <FormField
              id="username"
              name="username"
              type="text"
              label="Username"
              value={state?.username as string | undefined}
              placeholder="johndoe"
              error={validation?.username}
            />

            <FormField
              id="email"
              name="email"
              type="email"
              label="Email address"
              value={state?.email as string | undefined}
              placeholder="you@example.com"
              error={validation?.email}
            />

            <FormField
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              error={validation?.password}
            />

            <FormField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              error={validation?.confirmPassword}
            />

            <Checkbox name="terms" value="confirmed" error={validation?.terms}>
              I agree to the{" "}
              <Link to="/legal/terms" target="_blank">
                Terms of Service
              </Link>
              ,{" "}
              <Link to="/legal/privacy" target="_blank">
                Privacy Policy
              </Link>
              , and{" "}
              <Link to="/legal/cookies" target="_blank">
                Cookie Policy
              </Link>
              .
            </Checkbox>

            <Turnstile theme={props.theme} error={validation?.turnstile} />

            <Button type="submit" class="hidden turnstile-submit -mt-2">
              Create account
            </Button>

            <AuthFormLink
              label="Already have an account?"
              href="/auth/login"
              linkText="Sign in"
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
