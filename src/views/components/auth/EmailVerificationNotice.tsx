import { MailIcon } from "../icons/MailIcon";

export function EmailVerificationNotice() {
  return (
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
      <div class="flex items-start">
        <MailIcon class="h-6 w-6 text-blue-600 mt-0.5 mr-3 shrink-0" />
        <div>
          <h3 class="text-base font-semibold text-gray-900">
            Check your email
          </h3>
          <p class="mt-2 text-sm text-gray-600">
            We've sent a verification link to your email address. Please click
            the link in the email to verify your account and start using
            rawfeed.social.
          </p>
        </div>
      </div>
      <div class="pl-9">
        <p class="text-sm text-gray-600">
          <strong>Note:</strong> The verification link will expire in 24 hours.
        </p>
      </div>
    </div>
  );
}
