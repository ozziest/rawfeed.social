import type { PostWithContent } from "../../../types/relations";
import type { TokenPayload } from "../../../helpers/tokens";
import { getAvatar, toISO } from "../../../helpers/common";
import { PostContent } from "./PostContent";
import { PostStats } from "./PostStats";
import { Avatar } from "../users/Avatar";
import { BotBadge } from "../users/BotBadge";

type PostThreadRowProps = {
  post: PostWithContent;
  loggedUser?: TokenPayload;
  csrfToken?: string;
  /** Draw the vertical connector line below the avatar, linking to the next row */
  hasConnector?: boolean;
  /** The focal post (the one whose ID is in the URL) — no click-away, slightly bolder */
  isFocal?: boolean;
};

export function PostThreadRow({
  post,
  loggedUser,
  csrfToken,
  hasConnector = false,
  isFocal = false,
}: PostThreadRowProps) {
  const isReshare = post.reshare_id !== null;
  const displayPost = isReshare && post.resharedPost ? post.resharedPost : post;
  const displayIsoDate = toISO(displayPost.created_at as unknown as string);

  return (
    <div
      class={`relative flex gap-3 px-6 pt-5 ${!isFocal ? "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer" : ""}`}
    >
      {/* Stretched link for parent rows — clicking anywhere navigates to that post */}
      {!isFocal ? (
        <a
          href={`/posts/${displayPost.id}`}
          class="absolute inset-0 z-0"
          aria-label="View post"
        />
      ) : (
        ""
      )}

      {/* Left column: avatar + optional connector line */}
      <div class="flex flex-col items-center w-10 shrink-0">
        <div class="relative z-10">
          <a
            href={`/u/${displayPost.user.username}`}
            aria-label={`View profile of ${displayPost.user.name}`}
          >
            <Avatar
              src={getAvatar(displayPost.user)}
              alt={displayPost.user.name}
              size={40}
              className="w-10 h-10 hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
        {hasConnector ? (
          <div class="w-0.5 bg-gray-200 dark:bg-gray-600 flex-1 mt-2 min-h-8" />
        ) : (
          ""
        )}
      </div>

      {/* Right column */}
      <div class={`flex-1 min-w-0 ${hasConnector ? "pb-4" : "pb-5"}`}>
        {/* Reshare attribution */}
        {isReshare ? (
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span safe>{post.user.name}</span> reshared
          </p>
        ) : (
          ""
        )}

        {/* User info */}
        <div class="relative z-10 flex items-center gap-2 flex-wrap mb-2">
          <a
            href={`/u/${displayPost.user.username}`}
            class="font-semibold text-gray-900 dark:text-gray-100 hover:underline"
          >
            <span safe>{displayPost.user.name}</span>
          </a>
          {displayPost.user.bot_type ? <BotBadge /> : null}
          <a
            href={`/u/${displayPost.user.username}`}
            class="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            @<span safe>{displayPost.user.username}</span>
          </a>
          <a
            href={`/posts/${displayPost.id}`}
            class="text-gray-400 dark:text-gray-500 text-xs ml-auto hover:underline"
          >
            <time datetime={displayIsoDate} safe>
              {displayIsoDate}
            </time>
          </a>
        </div>

        {/* Content */}
        {isReshare && !post.resharedPost ? (
          <p class="text-gray-400 dark:text-gray-500 italic mb-3 text-sm">
            Original post unavailable.
          </p>
        ) : (
          <p
            class={`leading-relaxed mb-3 whitespace-pre-line wrap-break-words overflow-wrap-anywhere ${isFocal ? "text-gray-900 dark:text-gray-100 text-base" : "text-gray-800 dark:text-gray-200 line-clamp-12"}`}
            lang={displayPost.location ?? "en"}
          >
            <PostContent post={displayPost} />
          </p>
        )}

        {/* Stats */}
        <div class="relative z-10 flex gap-2 text-sm">
          <PostStats
            post={displayPost}
            loggedUser={loggedUser}
            csrfToken={csrfToken}
          />
        </div>
      </div>
    </div>
  );
}
