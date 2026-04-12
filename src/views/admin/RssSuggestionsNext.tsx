import type { RssSuggestionRow } from "../../types/shared";

type RssSuggestionsNextProps = {
  suggestions: RssSuggestionRow[];
  nextCursor: string | null;
  status?: string;
};

export function RssSuggestionsNext({
  suggestions,
  nextCursor,
  status,
}: RssSuggestionsNextProps) {
  const nextUrl = nextCursor
    ? `/admin/rss-suggestions/next/${nextCursor}${status ? `?status=${status}` : ""}`
    : null;

  return (
    <>
      {suggestions.map((s) => (
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              class="underline hover:text-black dark:hover:text-white"
              safe
            >
              {s.url}
            </a>
          </td>
          <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
            <a
              href={`/u/${s.submitter_username}`}
              class="underline"
              target="_blank"
              safe
            >
              @{s.submitter_username ?? "—"}
            </a>
          </td>
          <td class="px-4 py-3">
            {s.status === "pending" ? (
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                Pending
              </span>
            ) : s.status === "accepted" ? (
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                Accepted
              </span>
            ) : (
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                Rejected
              </span>
            )}
          </td>
          <td
            class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
            safe
          >
            {new Date(s.created_at).toLocaleDateString()}
          </td>
          <td class="px-4 py-3 text-right">
            <a
              href={`/admin/rss-suggestions/${s.id}`}
              class="text-sm font-medium text-black dark:text-white underline hover:no-underline whitespace-nowrap"
            >
              Review →
            </a>
          </td>
        </tr>
      ))}
      {nextUrl ? (
        <tr hx-get={nextUrl} hx-trigger="intersect once" hx-swap="outerHTML">
          <td
            colspan="7"
            class="px-4 py-6 text-center text-sm text-gray-400 animate-pulse"
          >
            Loading more…
          </td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
}
