import type { PostWithContent } from "../../../types/relations";
import type { TokenPayload } from "../../../helpers/tokens";
import { CsrfToken } from "../forms/CsrfToken";
import classNames from "classnames";
import { HeartIcon } from "../icons/HearthIcon";

type LikeButtonProps = {
  post: PostWithContent;
  loggedUser?: TokenPayload;
  csrfToken?: string;
};

export function LikeButton({ post, loggedUser, csrfToken }: LikeButtonProps) {
  const isOwnPost = !!loggedUser && post.user_id === loggedUser.userId;
  const canLike = !!loggedUser && !isOwnPost && csrfToken;

  if (canLike) {
    return (
      <span data-like-btn>
        <form
          hx-post={`/posts/like/${post.id}`}
          hx-target="closest [data-like-btn]"
          hx-swap="outerHTML"
          hx-disabled-elt="find button"
          class="inline"
        >
          <CsrfToken token={csrfToken} />
          <button
            type="submit"
            class={classNames([
              "flex items-center gap-1 transition-colors py-1 px-2 rounded-md cursor-pointer",
              "hover:text-red-500 hover:bg-gray-200",
              "dark:hover:text-red-300 dark:hover:bg-gray-700",
              {
                "text-red-400": post.isLiked,
                "text-gray-600 dark:text-gray-400": !post.isLiked,
              },
            ])}
            title={post.isLiked ? "Remove like" : "Like this post"}
          >
            <HeartIcon class="w-5 h-5" />
            <span>{post.likeCount}</span>
          </button>
        </form>
      </span>
    );
  }

  return (
    <span data-like-btn>
      <span
        class={classNames([
          "flex items-center gap-1 transition-colors py-1 px-2 rounded-md",
          {
            "text-gray-600 dark:text-gray-400 cursor-not-allowed": isOwnPost,
            "text-gray-400 dark:text-gray-600 opacity-50 cursor-not-allowed":
              !isOwnPost,
          },
        ])}
      >
        <HeartIcon class="w-5 h-5" />
        <span>{post.likeCount}</span>
      </span>
    </span>
  );
}
