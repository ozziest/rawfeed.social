import type { BaseProps } from "../../types/views";
import type { FeedTestResult } from "../../services/rss.service";

type RssSuggestionFeedPreviewProps = BaseProps & {
  result: FeedTestResult;
};

export function RssSuggestionFeedPreview({
  result,
}: RssSuggestionFeedPreviewProps) {
  if (!result.ok) {
    return (
      <div class="rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
        <p class="text-sm font-medium text-red-700 dark:text-red-400">
          Failed to fetch feed
        </p>
        <p
          class="text-sm text-red-600 dark:text-red-300 mt-1 font-mono break-all"
          safe
        >
          {result.error}
        </p>
      </div>
    );
  }

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-3">
        <div class="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm">
          <span class="font-medium text-gray-500 dark:text-gray-400">
            Title:{" "}
          </span>
          <span class="text-gray-900 dark:text-gray-100" safe>
            {result.feedTitle}
          </span>
        </div>
        <div class="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm">
          <span class="font-medium text-gray-500 dark:text-gray-400">
            Items:{" "}
          </span>
          <span class="text-gray-900 dark:text-gray-100">
            {result.itemCount}
          </span>
        </div>
        <div
          class={
            result.robotsAllowed
              ? "rounded-md border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-3 py-2 text-sm text-green-700 dark:text-green-300"
              : "rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-3 py-2 text-sm text-red-700 dark:text-red-300"
          }
        >
          robots.txt: {result.robotsAllowed ? "✓ Allowed" : "✕ Blocked"}
        </div>
      </div>

      {result.items.length > 0 ? (
        <div>
          <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Latest items (up to 5)
          </p>
          <ul class="divide-y divide-gray-100 dark:divide-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            {result.items.map((item) => (
              <li class="px-4 py-2.5 bg-white dark:bg-gray-800">
                <p
                  class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate"
                  safe
                >
                  {item.title}
                </p>
                <div class="flex items-center gap-3 mt-0.5">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs text-blue-600 dark:text-blue-400 underline truncate max-w-xs"
                    safe
                  >
                    {item.link}
                  </a>
                  {item.pubDate ? (
                    <span
                      class="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap"
                      safe
                    >
                      {item.pubDate}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
