import type { TokenPayload } from "../../helpers/tokens";
import { CsrfToken } from "../components/forms/CsrfToken";
import { LocationSelect } from "../components/forms/LocationSelect";
import { Textarea } from "../components/forms/Textarea";
import { FieldError } from "../components/forms/FieldError";

type ReplyFormProps = {
  postId: string;
  loggedUser: TokenPayload;
  csrfToken: string;
  validation?: Record<string, string>;
  formData?: Record<string, unknown>;
};

export function ReplyForm({
  postId,
  loggedUser,
  csrfToken,
  validation = {},
  formData = {},
}: ReplyFormProps) {
  return (
    <form
      id="reply-form"
      hx-post={`/posts/${postId}/reply`}
      hx-target="#reply-section"
      hx-swap="outerHTML"
      hx-disabled-elt="find button[type='submit']"
      class="bg-white rounded-lg shadow p-6 mb-6"
    >
      <CsrfToken token={csrfToken} />
      <div class="mb-4">
        <Textarea
          id="reply-content"
          name="content"
          maxlength={400}
          rows={3}
          placeholder="Write a reply..."
          value={(formData?.content as string) || ""}
        />
        <FieldError message={validation?.content} />
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <LocationSelect value={formData?.location as string | undefined} />
          <FieldError message={validation?.location} />
        </div>

        <button
          type="submit"
          class="bg-black enabled:hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50"
        >
          Reply
        </button>
      </div>

      {validation?.general ? (
        <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-700 text-sm" safe>
            {validation.general}
          </p>
        </div>
      ) : (
        ""
      )}
    </form>
  );
}
