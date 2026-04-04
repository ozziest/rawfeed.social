import type { PostWithContent } from "../../../types/relations";
import type { TokenPayload } from "../../../helpers/tokens";
import { ArrowsRightLeftIcon } from "../icons/ArrowsRightLeftIcon";
import { CsrfToken } from "../forms/CsrfToken";
import classNames from "classnames";

type ReshareButtonProps = {
  post: PostWithContent;
  loggedUser?: TokenPayload;
  csrfToken?: string;
};

export function ReshareButton({
  post,
  loggedUser,
  csrfToken,
}: ReshareButtonProps) {
  // Resharing a reshare is not allowed; only original posts can be reshared
  const isOriginal = post.reshare_id === null;
  const isOwnPost = !!loggedUser && post.user_id === loggedUser.userId;
  const canReshare = !!loggedUser && isOriginal && !isOwnPost && csrfToken;
  const isActive = post.userReshared === true;
  const count = post.stats_shares ?? 0;

  if (canReshare) {
    return (
      <span data-reshare-btn>
        <form
          hx-post={`/posts/reshare/${post.id}`}
          hx-target="closest [data-reshare-btn]"
          hx-swap="outerHTML"
          hx-disabled-elt="find button"
          class="inline"
        >
          <CsrfToken token={csrfToken} />
          <button
            type="submit"
            // class={`flex items-center gap-2 transition-colors cursor-pointer ${
            //   isActive
            //     ? "text-green-600 hover:text-gray-600 dark:hover:text-gray-400"
            //     : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
            // }`}
            class={classNames([
              "flex items-center gap-1 transition-colors py-1 px-2 rounded-md cursor-pointer",
              "hover:text-black hover:bg-gray-200",
              "dark:hover:text-white dark:hover:bg-gray-700",
              {
                "text-green-600": isActive,
                "text-gray-600 dark:text-gray-400": !isActive,
              },
            ])}
            title={isActive ? "Remove reshare" : "Reshare this post"}
          >
            <ArrowsRightLeftIcon class="w-5 h-5" />
            <span>{count}</span>
          </button>
        </form>
      </span>
    );
  }

  return (
    <span data-reshare-btn>
      <span
        class={classNames([
          "flex items-center gap-1 transition-colors py-1 px-2 rounded-md",
          {
            "text-gray-600 dark:text-gray-400 cursor-not-allowed": isOwnPost,
            "text-gray-400 dark:text-gray-600 opacity-50 dark:hover:text-white dark:hover:bg-gray-700 hover:text-black hover:bg-gray-200 cursor-pointer":
              !isOwnPost,
          },
        ])}
      >
        <ArrowsRightLeftIcon class="w-5 h-5" />
        <span>{count}</span>
      </span>
    </span>
  );
}
