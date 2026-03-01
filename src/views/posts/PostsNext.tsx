/** @jsxImportSource @kitajs/html */
import type { PostWithContent } from "../../types/relations";
import { Posts } from "../partials/Posts";

type PostsNextProps = {
  posts: PostWithContent[];
  nextCursor: string | null;
  userId?: string;
  feedNextRoute?: string;
};

export function PostsNext({
  posts,
  nextCursor,
  userId = "",
  feedNextRoute,
}: PostsNextProps) {
  const nextHref = feedNextRoute
    ? `${feedNextRoute}${nextCursor}`
    : `/posts/next/${nextCursor}/${userId}`;

  return (
    <>
      <Posts posts={posts} />
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
