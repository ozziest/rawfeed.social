/** @jsxImportSource @kitajs/html */
import type { PostWithContent } from "../../types/relations";
import type { TokenPayload } from "../../helpers/tokens";
import { Share } from "../partials/Share";
import { Posts } from "../partials/Posts";

type PostCreateProps = {
  posts: PostWithContent[];
  csrfToken: string;
  loggedUser?: TokenPayload;
  validation?: Record<string, string>;
  formData?: Record<string, unknown>;
};

export function PostCreate({
  posts,
  csrfToken,
  loggedUser,
  validation,
  formData,
}: PostCreateProps) {
  return (
    <>
      <Share
        loggedUser={loggedUser}
        csrfToken={csrfToken}
        validation={validation}
        formData={formData}
      />
      <div class="mb-4">
        <Posts posts={posts} />
      </div>
    </>
  );
}
