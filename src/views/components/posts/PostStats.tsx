import type { PostWithContent } from "../../../types/relations";
import type { TokenPayload } from "../../../helpers/tokens";
import { ChatBubbleIcon } from "../icons/ChatBubbleIcon";
import { ReshareButton } from "./ReshareButton";
import { PostStat } from "./PostStat";
import { LikeButton } from "./LikeButton";

type PostStatsProps = {
  post: PostWithContent;
  loggedUser?: TokenPayload;
  csrfToken?: string;
};

export function PostStats({ post, loggedUser, csrfToken }: PostStatsProps) {
  return (
    <>
      <LikeButton post={post} loggedUser={loggedUser} csrfToken={csrfToken} />
      <PostStat
        to={`/posts/${post.id}`}
        count={post.stats_replies}
        icon={<ChatBubbleIcon class="w-5 h-5" />}
      />
      <ReshareButton
        post={post}
        loggedUser={loggedUser}
        csrfToken={csrfToken}
      />
    </>
  );
}
