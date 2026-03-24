import type { PostWithContent } from "../../types/relations";
import type { TokenPayload } from "../../helpers/tokens";
import { Post } from "../components/posts/Post";

type ReplyListProps = {
  postId: string;
  replies: PostWithContent[];
  loggedUser?: TokenPayload;
  csrfToken?: string;
  validation?: Record<string, string>;
  formData?: Record<string, unknown>;
};

export function ReplyList({
  postId,
  replies,
  loggedUser,
  csrfToken,
}: ReplyListProps) {
  return (
    <div id="reply-list">
      <h2 class="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
        {replies.length} {replies.length === 1 ? "reply" : "replies"}
      </h2>

      {replies.length === 0 ? (
        <p class="text-gray-400 dark:text-gray-500 text-sm text-center py-8">
          No replies yet.
        </p>
      ) : (
        <div class="flex flex-col gap-4">
          {replies.map((reply) => (
            <Post
              post={reply}
              loggedUser={loggedUser}
              csrfToken={csrfToken}
              suppressThread={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
