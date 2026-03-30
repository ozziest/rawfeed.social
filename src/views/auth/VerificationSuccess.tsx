import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { CheckIcon } from "../components/icons/CheckIcon";
import { CheckCircleIcon } from "../components/icons/CheckCircleIcon";

export function VerificationSuccess(props: BaseProps) {
  return (
    <AuthLayout {...props}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <div class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
              <CheckIcon class="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Email Verified!
            </h2>
            <p class="mt-4 text-base text-gray-600 dark:text-gray-400">
              Your email address has been successfully verified
            </p>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 space-y-4">
            <div class="flex items-start">
              <CheckCircleIcon class="h-6 w-6 text-green-600 dark:text-green-400 mt-0.5 mr-3 shrink-0" />
              <div>
                <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">
                  You're all set!
                </h3>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Your account is now active and you can sign in to start using
                  rawfeed.social.
                </p>
              </div>
            </div>
          </div>

          <div>
            <a
              href="/auth/login"
              class="group relative flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Sign in to your account
            </a>
          </div>

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
