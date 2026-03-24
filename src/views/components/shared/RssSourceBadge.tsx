import { LinkIcon } from "../icons/LinkIcon";

type RssSourceBadgeProps = {
  rssSource: string;
};

export function RssSourceBadge({ rssSource }: RssSourceBadgeProps) {
  return (
    <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
      <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <LinkIcon class="w-4 h-4" />
        <span class="truncate" safe>
          {rssSource}
        </span>
      </div>
    </div>
  );
}
