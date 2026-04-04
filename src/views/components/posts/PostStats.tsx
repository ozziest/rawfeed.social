import type { PostWithContent } from "../../../types/relations";
import type { TokenPayload } from "../../../helpers/tokens";
import { ChatBubbleIcon } from "../icons/ChatBubbleIcon";
import { ReshareButton } from "./ReshareButton";
import classNames from "classnames";
import { PostStat } from "./PostStat";

type PostStatsProps = {
  post: PostWithContent;
  loggedUser?: TokenPayload;
  csrfToken?: string;
};

export function PostStats({ post, loggedUser, csrfToken }: PostStatsProps) {
  return (
    <>
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
