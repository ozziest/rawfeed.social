import type { PostWithContent } from "../../types/relations";
import type { TokenPayload } from "../../helpers/tokens";
import { Posts } from "../partials/Posts";

type PostsNextProps = {
  posts: PostWithContent[];
  nextCursor: string | null;
  userId?: string;
  feedNextRoute?: string;
  loggedUser?: TokenPayload;
  csrfToken?: string;
};

export function PostsNext({
  posts,
  nextCursor,
  userId = "",
  feedNextRoute,
  loggedUser,
  csrfToken,
}: PostsNextProps) {
  const nextHref = feedNextRoute
    ? `${feedNextRoute}${nextCursor}`
    : `/posts/next/${nextCursor}/${userId}`;

  return (
    <>
      <Posts posts={posts} loggedUser={loggedUser} csrfToken={csrfToken} />
      {nextCursor ? (
        <div
          hx-get={nextHref}
          hx-trigger="intersect once"
          hx-swap="outerHTML"
          class="h-20 flex items-center justify-center"
        >
          <div class="animate-pulse text-gray-500">Loading more...</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
