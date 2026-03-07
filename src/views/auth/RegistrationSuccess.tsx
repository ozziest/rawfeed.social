import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { AuthSuccessHeading } from "../components/auth/AuthSuccessHeading";
import { EmailVerificationNotice } from "../components/auth/EmailVerificationNotice";

export function RegistrationSuccess(props: BaseProps) {
  return (
    <AuthLayout {...props}>
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <AuthSuccessHeading
            title="Registration Successful!"
            subtitle="Thank you for registering on rawfeed.social"
          />

          <EmailVerificationNotice />

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
