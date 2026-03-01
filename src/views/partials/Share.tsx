/** @jsxImportSource @kitajs/html */
import type { TokenPayload } from "../../helpers/tokens";

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
        class="bg-white rounded-lg shadow p-6 mb-6"
      >
        <input type="hidden" name="_csrf" value={csrfToken} />
        <div class="mb-4">
          <textarea
            id="content"
            name="content"
            maxlength="400"
            rows="3"
            placeholder="What's on your mind?"
            class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
            safe
          >
            {contentValue}
          </textarea>
          {validation?.content ? (
            <div class="text-red-600 text-sm mt-2" safe>
              {validation.content}
            </div>
          ) : (
            ""
          )}
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <select
              id="location"
              name="location"
              class="text-sm text-gray-600 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option
                value="en"
                selected={
                  (formData?.location as string) === "en" || !formData?.location
                    ? true
                    : undefined
                }
              >
                English
              </option>
              <option
                value="tr"
                selected={
                  (formData?.location as string) === "tr" ? true : undefined
                }
              >
                Turkish
              </option>
              <option
                value="da"
                selected={
                  (formData?.location as string) === "da" ? true : undefined
                }
              >
                Danish
              </option>
            </select>
            {validation?.location ? (
              <span class="text-red-600 text-xs ml-2" safe>
                {validation.location}
              </span>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            class="bg-black enabled:hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50"
          >
            Share
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
    </div>
  );
}
