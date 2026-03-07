import { RssIcon } from "../icons/RssIcon";

type RssFeedLinkProps = { username: string };

export function RssFeedLink({ username }: RssFeedLinkProps) {
  return (
    <a
      href={`/u/${username}/rss`}
      class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors shrink-0"
      title="RSS Feed"
      target="_blank"
    >
      <RssIcon class="w-4 h-4" />
      RSS
    </a>
  );
}
