import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { AuthActionLinks } from "../components/auth/AuthActionLinks";
import { XMarkIcon } from "../components/icons/XMarkIcon";
import { ExclamationTriangleIcon } from "../components/icons/ExclamationTriangleIcon";

type ResetPasswordErrorProps = BaseProps & { errorMessage: string };

export function ResetPasswordError(props: ResetPasswordErrorProps) {
  const { errorMessage } = props;

  const isExpired = errorMessage.includes("expired");

  return (
    <AuthLayout {...props}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <div class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
              <XMarkIcon class="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Reset Failed
            </h2>
            <p class="mt-4 text-base text-gray-600 dark:text-gray-400">
              We couldn't process your password reset
            </p>
          </div>

          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 space-y-4">
            <div class="flex items-start">
              <ExclamationTriangleIcon class="h-6 w-6 text-red-600 dark:text-red-400 mt-0.5 mr-3 shrink-0" />
              <div>
                <h3
                  class="text-base font-semibold text-gray-900 dark:text-gray-100"
                  safe
                >
                  {errorMessage}
                </h3>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {isExpired
                    ? "The reset link has expired. Please request a new one."
                    : "The reset link may be invalid or has already been used. Please request a new one."}
                </p>
              </div>
            </div>
          </div>

          <AuthActionLinks
            primary={{
              href: "/auth/forgot-password",
              label: "Request a new reset link",
            }}
            secondary={{ href: "/auth/login", label: "Back to login" }}
          />

          <div class="text-center text-sm">
            <a
              href="/"
              class="font-medium text-black dark:text-gray-200 hover:text-gray-700 dark:hover:text-white underline"
            >
              Go to homepage
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
