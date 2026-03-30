import { RssIcon } from "../icons/RssIcon";

type RssFeedLinkProps = { username: string };

export function RssFeedLink({ username }: RssFeedLinkProps) {
  return (
    <a
      href={`/u/${username}/rss`}
      class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg transition-colors shrink-0"
      title="RSS Feed"
      target="_blank"
    >
      <RssIcon class="w-4 h-4" />
      RSS
    </a>
  );
}
