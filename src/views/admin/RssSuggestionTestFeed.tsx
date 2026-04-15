type RssSuggestionTestFeedProps = {
  suggestionId: string;
};

export function RssSuggestionTestFeed({
  suggestionId,
}: RssSuggestionTestFeedProps) {
  return (
    <div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
      <h2 class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Test Feed
      </h2>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Check robots.txt compliance and parse the feed before accepting.
      </p>
      <button
        hx-post={`/admin/rss-suggestions/${suggestionId}/test`}
        hx-target="#feed-preview"
        hx-swap="innerHTML"
        hx-indicator="#feed-test-spinner"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
      >
        Test Feed
        <span id="feed-test-spinner" class="htmx-indicator">
          ⟳
        </span>
      </button>
      <div id="feed-preview" class="mt-4" />
    </div>
  );
}
