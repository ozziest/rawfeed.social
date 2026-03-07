import type { PostWithContent } from "../../../types/relations";
import { toISO } from "../../../helpers/common";
import { ArrowsRightLeftIcon } from "../icons/ArrowsRightLeftIcon";

type ReshareHeaderProps = {
  post: PostWithContent;
};

export function ReshareHeader({ post }: ReshareHeaderProps) {
  const isoDate = toISO(post.created_at as unknown as string);

  return (
    <div class="flex items-center gap-2 px-6 py-2.5 bg-gray-50 border-b border-gray-100 text-xs text-gray-500">
      <ArrowsRightLeftIcon class="w-3.5 h-3.5 shrink-0 text-green-600" />
      <span>
        <a
          href={`/u/${post.user.username}`}
          class="font-semibold text-gray-700 hover:underline"
          safe
        >
          {post.user.name}
        </a>{" "}
        reshared
      </span>
      <time datetime={isoDate} safe class="ml-auto text-gray-400">
        {isoDate}
      </time>
    </div>
  );
}
