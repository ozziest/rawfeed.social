import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { AuthSuccessHeading } from "../components/auth/AuthSuccessHeading";

export function ForgotPasswordSuccess(props: BaseProps) {
  return (
    <AuthLayout {...props}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <AuthSuccessHeading
            title="Check your email"
            subtitle="A password reset link has been sent"
          />

          <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              If an account with that email address exists, you will receive an
              email with instructions to reset your password.
            </p>
            <p>
              The link will expire in <strong>1 hour</strong>.
            </p>
            <p>Didn't receive the email? Check your spam folder.</p>
          </div>

          <div class="text-center text-sm">
            <a
              href="/auth/login"
              class="font-medium text-black dark:text-gray-200 hover:text-gray-700 dark:hover:text-white underline"
            >
              Return to login
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
