/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";

export function RegistrationSuccess(props: BaseProps) {
  return (
    <AuthLayout {...props}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <div class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
              <svg
                class="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 class="text-3xl font-bold tracking-tight text-gray-900">
              Registration Successful!
            </h2>
            <p class="mt-4 text-base text-gray-600">
              Thank you for registering on rawfeed.social
            </p>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
            <div class="flex items-start">
              <svg
                class="h-6 w-6 text-blue-600 mt-0.5 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <h3 class="text-base font-semibold text-gray-900">
                  Check your email
                </h3>
                <p class="mt-2 text-sm text-gray-600">
                  We've sent a verification link to your email address. Please
                  click the link in the email to verify your account and start
                  using rawfeed.social.
                </p>
              </div>
            </div>

            <div class="pl-9">
              <p class="text-sm text-gray-600">
                <strong>Note:</strong> The verification link will expire in 24
                hours.
              </p>
            </div>
          </div>

          <div class="text-center text-sm text-gray-600 space-y-2">
            <p>Didn't receive the email? Check your spam folder.</p>
            <p class="mt-4">
              <a
                href="/auth/login"
                class="font-medium text-black hover:text-gray-700 underline"
              >
                Return to login
              </a>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
