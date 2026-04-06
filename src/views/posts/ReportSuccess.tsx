import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { CheckCircleIcon } from "../components/icons/CheckCircleIcon";

type ReportSuccessProps = BaseProps & {
  postId: string;
};

export function ReportSuccess(props: ReportSuccessProps) {
  const { postId } = props;

  return (
    <AuthLayout {...props} title="Report Submitted — Rawfeed">
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md text-center space-y-6">
          <div class="flex justify-center">
            <CheckCircleIcon class="w-16 h-16 text-green-500" />
          </div>

          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Report Submitted
            </h1>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Thank you for helping keep Rawfeed safe. We'll review this post
              and take appropriate action.
            </p>
          </div>

          <a
            href={`/posts/${postId}`}
            class="inline-block bg-black text-white font-medium rounded-lg px-6 py-2 hover:bg-gray-800 transition-colors"
          >
            Back to post
          </a>
        </div>
      </div>
    </AuthLayout>
  );
}
