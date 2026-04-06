import type { BaseProps } from "../../types/views";
import { AuthLayout } from "../layouts/AuthLayout";
import { FlashMessages } from "../partials/FlashMessages";
import { Button } from "../components/forms/Button";
import { CsrfToken } from "../components/forms/CsrfToken";
import { FieldError } from "../components/forms/FieldError";
import { Textarea } from "../components/forms/Textarea";
import { REPORT_REASONS } from "../../helpers/validations";
import type { PostWithContent } from "../../types/relations";

type ReportPostProps = BaseProps & {
  csrfToken: string;
  post: PostWithContent;
};

export function ReportPost(props: ReportPostProps) {
  const { csrfToken, post, validation, state } = props;
  const selectedReason = state?.reason as string | undefined;

  return (
    <AuthLayout {...props} title="Report Post — Rawfeed">
      <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-lg space-y-6">
          <FlashMessages state={props.state} />

          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Report Post
            </h1>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Help us keep Rawfeed safe. Reports are reviewed manually.
            </p>
          </div>

          {/* Post preview */}
          <div
            class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line wrap-break-word"
            safe
          >
            {post.content}
          </div>

          <form
            action={`/report/post/${post.id}`}
            method="post"
            class="space-y-6"
          >
            <CsrfToken token={csrfToken} />

            {/* Reason */}
            <div>
              <fieldset>
                <legend class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason <span class="text-red-500">*</span>
                </legend>
                <div class="space-y-2">
                  {REPORT_REASONS.map((reason) => (
                    <label class="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="reason"
                        value={reason}
                        checked={selectedReason === reason || undefined}
                        class="h-4 w-4 text-black border-gray-300 focus:ring-black"
                        safe
                      />
                      <span class="text-sm text-gray-700 dark:text-gray-300">
                        {reason}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <FieldError message={validation?.reason} />
            </div>

            {/* Optional explanation */}
            <div>
              <label
                for="explanation"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Additional explanation{" "}
                <span class="text-gray-400 font-normal">(optional)</span>
              </label>
              <Textarea
                id="explanation"
                name="explanation"
                placeholder="Describe the issue in more detail..."
                rows={4}
                maxlength={400}
                value={state?.explanation as string | undefined}
              />
              <FieldError message={validation?.explanation} />
            </div>

            <div class="flex items-center gap-4">
              <Button type="submit" variant="danger">
                Submit Report
              </Button>
              <a
                href={`/posts/${post.id}`}
                class="text-sm text-gray-500 dark:text-gray-400 hover:underline"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
