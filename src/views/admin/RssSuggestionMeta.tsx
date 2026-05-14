import type { RssSuggestionRow } from "../../types/shared";

type RssSuggestionMetaProps = {
  suggestion: RssSuggestionRow;
};

const STATUS_LABEL: Record<string, { class: string }> = {
  pending: {
    class:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
  },
  accepted: {
    class:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",
  },
  rejected: {
    class:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800",
  },
};

export function RssSuggestionMeta({ suggestion }: RssSuggestionMetaProps) {
  return (
    <div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
      <div class="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Suggestion Detail
        </h1>
        <span
          class={
            suggestion.status === "accepted"
              ? STATUS_LABEL.accepted.class
              : suggestion.status === "rejected"
                ? STATUS_LABEL.rejected.class
                : STATUS_LABEL.pending.class
          }
        >
          {suggestion.status === "accepted"
            ? "Accepted"
            : suggestion.status === "rejected"
              ? "Rejected"
              : "Pending"}
        </span>
      </div>
      <dl class="divide-y divide-gray-100 dark:divide-gray-700">
        <div class="px-5 py-3 grid grid-cols-3 gap-4">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Feed URL
          </dt>
          <dd class="col-span-2 text-sm text-gray-900 dark:text-gray-100 break-all">
            <a
              href={suggestion.url}
              target="_blank"
              rel="noopener noreferrer"
              class="underline"
              safe
            >
              {suggestion.url}
            </a>
          </dd>
        </div>
        <div class="px-5 py-3 grid grid-cols-3 gap-4">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Submitted by
          </dt>
          <dd class="col-span-2 text-sm text-gray-900 dark:text-gray-100" safe>
            @{suggestion.submitter_username ?? "—"} &lt;
            {suggestion.submitter_email ?? "—"}&gt;
          </dd>
        </div>
        <div class="px-5 py-3 grid grid-cols-3 gap-4">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Language
          </dt>
          <dd
            class="col-span-2 text-sm font-mono uppercase text-gray-900 dark:text-gray-100"
            safe
          >
            {suggestion.language}
          </dd>
        </div>
        <div class="px-5 py-3 grid grid-cols-3 gap-4">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Feed owner?
          </dt>
          <dd class="col-span-2 text-sm text-gray-900 dark:text-gray-100">
            {suggestion.is_owner ? "Yes" : "No"}
          </dd>
        </div>
        <div class="px-5 py-3 grid grid-cols-3 gap-4">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Submitted
          </dt>
          <dd class="col-span-2 text-sm text-gray-900 dark:text-gray-100" safe>
            {new Date(suggestion.created_at).toLocaleString()}
          </dd>
        </div>
        {suggestion.rejection_reason ? (
          <div class="px-5 py-3 grid grid-cols-3 gap-4">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Rejection reason
            </dt>
            <dd class="col-span-2 text-sm text-red-700 dark:text-red-400" safe>
              {suggestion.rejection_reason}
            </dd>
          </div>
        ) : null}
        {suggestion.admin_notes ? (
          <div class="px-5 py-3 grid grid-cols-3 gap-4">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Admin notes
            </dt>
            <dd
              class="col-span-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line"
              safe
            >
              {suggestion.admin_notes}
            </dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
