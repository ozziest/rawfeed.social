import type { DailyReportItem } from "../../../types/shared";

export type SidebarTrendingProps = {
  report: DailyReportItem[];
};

export function SidebarTrending({ report }: SidebarTrendingProps) {
  return (
    <div class="space-y-2">
      {report.map((item) => (
        <a
          href={`/tags/${item.hashtag}`}
          class="block hover:bg-gray-50 dark:hover:bg-gray-700 -mx-2 px-2 py-1 rounded"
        >
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
            #<span safe>{item.hashtag}</span>
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {item.total} posts
          </p>
        </a>
      ))}
    </div>
  );
}
