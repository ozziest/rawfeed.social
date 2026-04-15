import type { BaseProps } from "../../types/views";
import { Button } from "../components/forms/Button";
import { CsrfToken } from "../components/forms/CsrfToken";
import { FieldError } from "../components/forms/FieldError";
import { RSS_REJECTION_REASONS } from "../../helpers/validations";

type RssSuggestionRejectFormProps = {
  suggestionId: string;
  csrfToken: string;
  state: BaseProps["state"];
  validation: BaseProps["validation"];
};

export function RssSuggestionRejectForm({
  suggestionId,
  csrfToken,
  state,
  validation,
}: RssSuggestionRejectFormProps) {
  return (
    <div class="rounded-lg border border-red-200 dark:border-red-800 bg-white dark:bg-gray-800 p-5">
      <h2 class="text-sm font-semibold text-red-700 dark:text-red-400 mb-4">
        Reject Suggestion
      </h2>
      <form
        action={`/admin/rss-suggestions/${suggestionId}/reject`}
        method="post"
        class="space-y-4"
      >
        <CsrfToken token={csrfToken} />

        <div>
          <label
            for="rejection_reason"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Rejection Reason <span class="text-red-500">*</span>
          </label>
          <select
            id="rejection_reason"
            name="rejection_reason"
            class="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="">Select a reason...</option>
            {RSS_REJECTION_REASONS.map((r) => (
              <option
                value={r}
                selected={state?.rejection_reason === r || undefined}
              >
                {r}
              </option>
            ))}
          </select>
          <FieldError message={validation?.rejection_reason} />
        </div>

        <div>
          <label
            for="admin_notes"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Admin Notes (optional, internal only)
          </label>
          <textarea
            id="admin_notes"
            name="admin_notes"
            rows="2"
            placeholder="Internal notes..."
            class="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black resize-none"
            safe
          >
            {(state?.admin_notes as string) ?? ""}
          </textarea>
        </div>

        <Button type="submit" variant="danger">
          Reject Suggestion
        </Button>
      </form>
    </div>
  );
}
