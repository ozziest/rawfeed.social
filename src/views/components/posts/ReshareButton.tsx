import type { PostWithContent } from "../../../types/relations";
import type { TokenPayload } from "../../../helpers/tokens";
import { ArrowsRightLeftIcon } from "../icons/ArrowsRightLeftIcon";
import { CsrfToken } from "../forms/CsrfToken";

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
            class={`flex items-center gap-2 transition-colors cursor-pointer ${
              isActive
                ? "text-green-600 hover:text-gray-600"
                : "text-gray-600 hover:text-green-600"
            }`}
            title={isActive ? "Remove reshare" : "Reshare this post"}
          >
            <ArrowsRightLeftIcon class="w-5 h-5" />
            <span>
              {count} {count === 1 ? "reshare" : "reshares"}
            </span>
          </button>
        </form>
      </span>
    );
  }

  return (
    <span data-reshare-btn>
      <span
        class={`flex items-center gap-2 ${isOwnPost ? "text-gray-600" : "text-gray-400 opacity-50"}`}
      >
        <ArrowsRightLeftIcon class="w-5 h-5" />
        <span>
          {count} {count === 1 ? "reshare" : "reshares"}
        </span>
      </span>
    </span>
  );
}
