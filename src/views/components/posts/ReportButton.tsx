import type { PostWithContent } from "../../../types/relations";
import { ExclamationTriangleIcon } from "../icons/ExclamationTriangleIcon";
import classNames from "classnames";

type ReportButtonProps = {
  post: PostWithContent;
};

export function ReportButton({ post }: ReportButtonProps) {
  return (
    <a
      href={`/report/post/${post.id}`}
      title="Report this post"
      class={classNames([
        "flex items-center gap-1 transition-colors py-1 px-2 rounded-md",
        "text-gray-400 hover:text-red-500 hover:bg-red-50",
        "dark:text-gray-600 dark:hover:text-red-400 dark:hover:bg-red-950/30",
      ])}
      onclick="event.stopPropagation()"
    >
      <ExclamationTriangleIcon class="w-4 h-4" />
    </a>
  );
}
