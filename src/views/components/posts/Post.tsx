import type { PostWithContent } from "../../../types/relations";
import type { TokenPayload } from "../../../helpers/tokens";
import { toISO } from "../../../helpers/common";
import { PostContent } from "./PostContent";
import { PostStats } from "./PostStats";
import { ReshareHeader } from "./ReshareHeader";
import { PostThreadRow } from "./PostThreadRow";
import { PostAuthor } from "./PostAuthor";

export type PostProps = {
  post: PostWithContent;
  loggedUser?: TokenPayload;
  csrfToken?: string;
  suppressThread?: boolean;
};

export function Post({
  post,
  loggedUser,
  csrfToken,
  suppressThread = false,
}: PostProps) {
  const isReshare = post.reshare_id !== null;
  const isReply = post.parent_id !== null && !isReshare;

  // Reply with parent available → thread card (vertical connector between avatars)
  if (isReply && post.parentPost && !suppressThread) {
    return (
      <article class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <PostThreadRow
          post={post.parentPost}
          loggedUser={loggedUser}
          csrfToken={csrfToken}
          hasConnector={true}
          isFocal={false}
        />
        <PostThreadRow
          post={post}
          loggedUser={loggedUser}
          csrfToken={csrfToken}
          hasConnector={false}
          isFocal={false}
        />
      </article>
    );
  }

  // Standard card (top-level post or reshare)
  const displayPost = isReshare && post.resharedPost ? post.resharedPost : post;
  const displayIsoDate = toISO(displayPost.created_at as unknown as string);

  return (
    <article class="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
      {/* Stretched link — covers the full card for click / keyboard / middle-click / Ctrl+click */}
      <a
        href={`/posts/${displayPost.id}`}
        class="absolute inset-0 z-0"
        aria-label={`View post by ${displayPost.user.name}`}
      />

      {/* Reshared-by header */}
      {isReshare ? <ReshareHeader post={post} /> : null}

      <div class="p-6 ">
        <PostAuthor user={displayPost.user} />

        {/* Content */}
        {isReshare && !post.resharedPost ? (
          <p class="text-gray-400 italic mb-4 text-sm">
            Original post unavailable.
          </p>
        ) : (
          <p
            class="text-gray-900 leading-relaxed mb-4 whitespace-pre-line wrap-break-words overflow-wrap-anywhere line-clamp-12"
            lang={displayPost.location ?? "en"}
          >
            <PostContent post={displayPost} />
          </p>
        )}

        <div class="relative z-10 flex items-center justify-between text-sm">
          <div class="flex gap-6">
            <PostStats
              post={displayPost}
              loggedUser={loggedUser}
              csrfToken={csrfToken}
            />
          </div>
          {!isReshare ? (
            <a
              href={`/posts/${displayPost.id}`}
              class="text-gray-400 text-xs hover:underline"
            >
              <time datetime={displayIsoDate} safe>
                {displayIsoDate}
              </time>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
