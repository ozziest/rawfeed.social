import type { PostWithContent } from "../../../types/relations";
import type { TokenPayload } from "../../../helpers/tokens";
import { getAvatar } from "../../../helpers/common";
import { toISO } from "../../../helpers/common";
import { PostContent } from "./PostContent";
import { PostStats } from "./PostStats";
import { Avatar } from "../users/Avatar";
import { BotBadge } from "../users/BotBadge";
import { ReshareHeader } from "./ReshareHeader";

export type PostProps = {
  post: PostWithContent;
  loggedUser?: TokenPayload;
  csrfToken?: string;
};

export function Post({ post, loggedUser, csrfToken }: PostProps) {
  const isReshare = post.reshare_id !== null;

  // For reshares, show the original post's content; the resharer is shown as a label
  const displayPost = isReshare && post.resharedPost ? post.resharedPost : post;
  const displayIsoDate = toISO(displayPost.created_at as unknown as string);

  return (
    <article class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Reshared-by header */}
      {isReshare ? <ReshareHeader post={post} /> : null}

      <div class="p-6">
        {/* User Info */}
        <div class="flex items-center gap-3 mb-4">
          <Avatar
            src={getAvatar(displayPost.user)}
            alt={displayPost.user.name}
            size={40}
            className="w-10 h-10"
          />
          <div>
            <div class="flex items-center gap-2">
              <a
                href={`/u/${displayPost.user.username}`}
                class="font-semibold text-gray-900 hover:underline"
              >
                <span safe>{displayPost.user.name}</span>
              </a>
              {displayPost.user.bot_type ? <BotBadge /> : null}
            </div>
            <p class="text-sm text-gray-500">
              @<span safe>{displayPost.user.username}</span>
            </p>
          </div>
        </div>

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

        <div class="flex items-center justify-between text-sm">
          <div class="flex gap-6">
            <PostStats
              post={displayPost}
              loggedUser={loggedUser}
              csrfToken={csrfToken}
            />
          </div>
          {!isReshare ? (
            <time class="text-gray-400 text-xs" datetime={displayIsoDate} safe>
              {displayIsoDate}
            </time>
          ) : null}
        </div>
      </div>
    </article>
  );
}
