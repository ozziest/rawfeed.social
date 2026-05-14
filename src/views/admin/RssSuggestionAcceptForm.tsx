import type { BaseProps } from "../../types/views";
import { Button } from "../components/forms/Button";
import { CsrfToken } from "../components/forms/CsrfToken";
import { FieldError } from "../components/forms/FieldError";
import {
  RSS_LANGUAGES,
  UPDATE_FREQUENCY_OPTIONS,
} from "../../helpers/validations";

type RssSuggestionAcceptFormProps = {
  suggestionId: string;
  suggestionLanguage: string;
  csrfToken: string;
  state: BaseProps["state"];
  validation: BaseProps["validation"];
};

export function RssSuggestionAcceptForm({
  suggestionId,
  suggestionLanguage,
  csrfToken,
  state,
  validation,
}: RssSuggestionAcceptFormProps) {
  return (
    <div class="rounded-lg border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 p-5">
      <h2 class="text-sm font-semibold text-green-800 dark:text-green-300 mb-4">
        Accept Suggestion
      </h2>
      <form
        action={`/admin/rss-suggestions/${suggestionId}/accept`}
        method="post"
        class="space-y-4"
      >
        <CsrfToken token={csrfToken} />

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              for="bot_username"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Bot Username <span class="text-red-500">*</span>
            </label>
            <input
              id="bot_username"
              name="bot_username"
              type="text"
              value={(state?.bot_username as string) ?? ""}
              placeholder="rss_example_feed"
              class="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              safe
            />
            <p class="text-xs text-gray-400 mt-1">
              Must start with rss_ (e.g. rss_hacker_news)
            </p>
            <FieldError message={validation?.bot_username} />
          </div>

          <div>
            <label
              for="bot_name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Bot Display Name <span class="text-red-500">*</span>
            </label>
            <input
              id="bot_name"
              name="bot_name"
              type="text"
              value={(state?.bot_name as string) ?? ""}
              placeholder="Hacker News"
              class="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              safe
            />
            <FieldError message={validation?.bot_name} />
          </div>
        </div>

        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Source Name <span class="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={(state?.name as string) ?? ""}
            placeholder="Hacker News"
            class="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            safe
          />
          <FieldError message={validation?.name} />
        </div>

        <div>
          <label
            for="bio"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="2"
            placeholder="Short description of this feed..."
            class="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black resize-none"
            safe
          >
            {(state?.bio as string) ?? ""}
          </textarea>
          <FieldError message={validation?.bio} />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              for="language"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Language <span class="text-red-500">*</span>
            </label>
            <select
              id="language"
              name="language"
              class="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              {RSS_LANGUAGES.map((lang) => (
                <option
                  value={lang.code}
                  selected={
                    (state?.language ?? suggestionLanguage) === lang.code ||
                    undefined
                  }
                >
                  {lang.label}
                </option>
              ))}
            </select>
            <FieldError message={validation?.language} />
          </div>

          <div>
            <label
              for="update_frequency"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Update Frequency <span class="text-red-500">*</span>
            </label>
            <select
              id="update_frequency"
              name="update_frequency"
              class="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              {UPDATE_FREQUENCY_OPTIONS.map((opt) => (
                <option
                  value={opt.value}
                  selected={
                    (state?.update_frequency ?? "0 */4 * * *") === opt.value ||
                    undefined
                  }
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <FieldError message={validation?.update_frequency} />
          </div>
        </div>

        <div>
          <label
            for="category"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={(state?.category as string) ?? ""}
            placeholder="tech, blog, news, gaming, science, podcast..."
            class="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            safe
          />
          <FieldError message={validation?.category} />
        </div>

        <Button type="submit" variant="primary" class="px-5 py-2">
          Accept &amp; Create Bot
        </Button>
      </form>
    </div>
  );
}
