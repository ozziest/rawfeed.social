import type { PostWithContent } from "../../types/relations";
import type { TokenPayload } from "../../helpers/tokens";
import { ReplyForm } from "./ReplyForm";
import { ReplyList } from "./ReplyList";

type ReplySectionProps = {
  postId: string;
  replies: PostWithContent[];
  loggedUser?: TokenPayload;
  csrfToken: string;
  validation?: Record<string, string>;
  formData?: Record<string, unknown>;
};

export function ReplySection({
  postId,
  replies,
  loggedUser,
  csrfToken,
  validation,
  formData,
}: ReplySectionProps) {
  return (
    <div id="reply-section">
      {loggedUser ? (
        <ReplyForm
          postId={postId}
          loggedUser={loggedUser}
          csrfToken={csrfToken}
          validation={validation}
          formData={formData}
        />
      ) : (
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          <a
            href="/auth/login"
            class="text-black dark:text-gray-200 font-medium hover:underline"
          >
            Log in
          </a>{" "}
          to reply.
        </div>
      )}
      <ReplyList
        postId={postId}
        replies={replies}
        loggedUser={loggedUser}
        csrfToken={csrfToken}
      />
    </div>
  );
}
