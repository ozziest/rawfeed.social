import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { AuthActionLinks } from "../components/auth/AuthActionLinks";
import { XMarkIcon } from "../components/icons/XMarkIcon";
import { ExclamationTriangleIcon } from "../components/icons/ExclamationTriangleIcon";

type VerificationErrorProps = BaseProps & { errorMessage: string };

export function VerificationError(props: VerificationErrorProps) {
  const { errorMessage } = props;

  const isExpired = errorMessage.includes("expired");

  return (
    <AuthLayout {...props}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <div class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
              <XMarkIcon class="h-8 w-8 text-red-600" />
            </div>
            <h2 class="text-3xl font-bold tracking-tight text-gray-900">
              Verification Failed
            </h2>
            <p class="mt-4 text-base text-gray-600">
              We couldn't verify your email address
            </p>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-lg p-6 space-y-4">
            <div class="flex items-start">
              <ExclamationTriangleIcon class="h-6 w-6 text-red-600 mt-0.5 mr-3 shrink-0" />
              <div>
                <h3 class="text-base font-semibold text-gray-900" safe>
                  {errorMessage}
                </h3>
                <p class="mt-2 text-sm text-gray-600">
                  {isExpired
                    ? "The verification link has expired. Please register again or contact support for assistance."
                    : "The verification link may be invalid or has already been used. If you already verified your account, you can sign in directly."}
                </p>
              </div>
            </div>
          </div>

          <AuthActionLinks
            primary={{ href: "/auth/login", label: "Go to login" }}
            secondary={{
              href: "/auth/register",
              label: "Register a new account",
            }}
          />

          <div class="text-center text-sm">
            <a
              href="/"
              class="font-medium text-black hover:text-gray-700 underline"
            >
              Go to homepage
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
