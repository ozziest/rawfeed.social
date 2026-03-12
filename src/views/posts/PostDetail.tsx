import type { PostWithContent } from "../../types/relations";
import type { BaseProps } from "../../types/views";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Post } from "../components/posts/Post";
import { ReplySection } from "./ReplySection";

type PostDetailProps = BaseProps & {
  post: PostWithContent;
  replies: PostWithContent[];
  csrfToken: string;
};

export function PostDetail({
  post,
  replies,
  csrfToken,
  loggedUser,
  title: _title,
  description: _description,
  ...rest
}: PostDetailProps) {
  return (
    <DefaultLayout
      title={`Post by @${post.user?.username ?? "unknown"}`}
      description={post.content?.slice(0, 160) ?? ""}
      loggedUser={loggedUser}
      {...rest}
    >
      <main class="max-w-2xl mx-auto px-4 py-8">
        {/* Focal post — parent context is rendered automatically via post.parentPost */}
        <div class="mb-6">
          <Post post={post} loggedUser={loggedUser} csrfToken={csrfToken} />
        </div>

        {/* Reply form + list */}
        <ReplySection
          postId={post.id}
          replies={replies}
          loggedUser={loggedUser}
          csrfToken={csrfToken}
        />
      </main>
    </DefaultLayout>
  );
}
