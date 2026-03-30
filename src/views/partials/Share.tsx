import type { TokenPayload } from "../../helpers/tokens";
import { CsrfToken } from "../components/forms/CsrfToken";
import { LocationSelect } from "../components/forms/LocationSelect";
import { Textarea } from "../components/forms/Textarea";
import { FieldError } from "../components/forms/FieldError";

type ShareProps = {
  loggedUser?: TokenPayload;
  csrfToken: string;
  validation?: Record<string, string>;
  formData?: Record<string, unknown>;
  activeHashtag?: string;
};

export function Share({
  loggedUser,
  csrfToken,
  validation = {},
  formData = {},
  activeHashtag = "",
}: ShareProps) {
  if (!loggedUser) return "";

  const contentValue = (formData?.content as string) || activeHashtag || "";

  return (
    <div>
      <form
        id="post-form"
        hx-post="/posts/create"
        hx-swap="outerHTML"
        hx-disabled-elt="find button[type='submit']"
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6"
      >
        <CsrfToken token={csrfToken} />
        <div class="mb-4">
          <Textarea
            id="content"
            name="content"
            maxlength={400}
            rows={3}
            placeholder="What's on your mind?"
            value={contentValue}
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
            Share
          </button>
        </div>

        {validation?.general ? (
          <div class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p class="text-red-700 dark:text-red-400 text-sm" safe>
              {validation.general}
            </p>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
