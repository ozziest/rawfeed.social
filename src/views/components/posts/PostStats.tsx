import type { PostWithContent } from "../../../types/relations";
import type { TokenPayload } from "../../../helpers/tokens";
import { ChatBubbleIcon } from "../icons/ChatBubbleIcon";
import { ReshareButton } from "./ReshareButton";

type PostStatsProps = {
  post: PostWithContent;
  loggedUser?: TokenPayload;
  csrfToken?: string;
};

export function PostStats({ post, loggedUser, csrfToken }: PostStatsProps) {
  return (
    <>
      <button class="flex items-center gap-2 text-gray-600 hover:text-black transition-colors opacity-50">
        <ChatBubbleIcon class="w-5 h-5" />
        <span>
          {post.stats_replies ?? 0}{" "}
          {post.stats_replies === 1 ? "reply" : "replies"}
        </span>
      </button>
      <ReshareButton
        post={post}
        loggedUser={loggedUser}
        csrfToken={csrfToken}
      />
    </>
  );
}
