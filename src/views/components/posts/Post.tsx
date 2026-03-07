import type { PostWithContent } from "../../../types/relations";
import { getAvatar } from "../../../helpers/common";
import { toISO } from "../../../helpers/common";
import { PostContent } from "./PostContent";
import { PostStats } from "./PostStats";
import { Avatar } from "../users/Avatar";
import { BotBadge } from "../users/BotBadge";

export type PostProps = {
  post: PostWithContent;
};

export function Post({ post }: PostProps) {
  const isoDate = toISO(post.created_at as unknown as string);

  return (
    <article class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* User Info */}
      <div class="flex items-center gap-3 mb-4">
        <Avatar
          src={getAvatar(post.user)}
          alt={post.user.name}
          size={40}
          className="w-10 h-10"
        />
        <div>
          <div class="flex items-center gap-2">
            <a
              href={`/u/${post.user.username}`}
              class="font-semibold text-gray-900 hover:underline"
            >
              <span safe>{post.user.name}</span>
            </a>
            {post.user.bot_type ? <BotBadge /> : null}
          </div>
          <p class="text-sm text-gray-500">
            @<span safe>{post.user.username}</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <p
        class="text-gray-900 leading-relaxed mb-4 whitespace-pre-line wrap-break-words overflow-wrap-anywhere line-clamp-12"
        lang={post.location ?? "en"}
      >
        <PostContent post={post} />
      </p>

      <div class="flex items-center justify-between text-sm">
        <div class="flex gap-6">
          <PostStats />
        </div>
        <time class="text-gray-400 text-xs" datetime={isoDate} safe>
          {isoDate}
        </time>
      </div>
    </article>
  );
}
