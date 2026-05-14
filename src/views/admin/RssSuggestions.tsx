import type { BaseProps } from "../../types/views";
import type { RssSuggestionRow } from "../../types/shared";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { RssSuggestionsNext } from "./RssSuggestionsNext";
import { TabLink } from "../components/shared/TabLink";

type RssSuggestionsProps = BaseProps & {
  suggestions: RssSuggestionRow[];
  nextCursor: string | null;
  status?: string;
  counts: {
    pending: number;
    accepted: number;
    rejected: number;
    total: number;
  };
};

export function RssSuggestions(props: RssSuggestionsProps) {
  const { suggestions, nextCursor, status, counts } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
            RSS Feed Suggestions
          </h1>
        </div>

        {/* Status tabs */}
        <div class="flex gap-1 mb-4 border-b border-gray-200 dark:border-gray-700">
          <TabLink href="/admin/rss-suggestions" active={!status}>
            All ({counts.total})
          </TabLink>
          <TabLink
            href="/admin/rss-suggestions?status=pending"
            active={status === "pending"}
          >
            Pending ({counts.pending})
          </TabLink>
          <TabLink
            href="/admin/rss-suggestions?status=accepted"
            active={status === "accepted"}
          >
            Accepted ({counts.accepted})
          </TabLink>
          <TabLink
            href="/admin/rss-suggestions?status=rejected"
            active={status === "rejected"}
          >
            Rejected ({counts.rejected})
          </TabLink>
        </div>

        {suggestions.length === 0 ? (
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            No suggestions found.
          </p>
        ) : (
          <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Feed URL
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Submitter
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th class="px-4 py-3" />
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                <RssSuggestionsNext
                  suggestions={suggestions}
                  nextCursor={nextCursor}
                  status={status}
                />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
