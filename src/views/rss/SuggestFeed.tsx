import type { BaseProps } from "../../types/views";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { FlashMessages } from "../partials/FlashMessages";
import { Button } from "../components/forms/Button";
import { CsrfToken } from "../components/forms/CsrfToken";
import { FieldError } from "../components/forms/FieldError";
import {
  RSS_REJECTION_REASONS,
  RSS_LANGUAGES,
} from "../../helpers/validations";

type SuggestFeedProps = BaseProps & {
  csrfToken: string;
};

const NOT_ACCEPTED_REASONS = RSS_REJECTION_REASONS;

export function SuggestFeed(props: SuggestFeedProps) {
  const { csrfToken, validation, state, loggedUser } = props;
  const isGuest = !loggedUser;
  const selectedLanguage = (state?.language as string) ?? "en";
  const isOwnerChecked = state?.is_owner === "on";

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <FlashMessages state={props.state} />

        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Suggest an RSS Feed
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Know a great RSS feed that should be on Rawfeed? Submit it for
            review by our moderation team. Acceptance is not guaranteed.
          </p>
        </div>

        {isGuest ? (
          <div class="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 p-4 mb-6">
            <p class="text-sm text-blue-800 dark:text-blue-200 font-medium">
              You must be logged in to suggest an RSS feed.{" "}
              <a
                href="/auth/login"
                class="underline font-semibold hover:text-blue-900 dark:hover:text-blue-100"
              >
                Log in
              </a>{" "}
              or{" "}
              <a
                href="/auth/register"
                class="underline font-semibold hover:text-blue-900 dark:hover:text-blue-100"
              >
                create an account
              </a>{" "}
              to submit suggestions.
            </p>
          </div>
        ) : null}

        <form
          action="/rss/suggest"
          method="post"
          class="space-y-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <CsrfToken token={csrfToken} />

          {/* RSS Feed URL */}
          <div>
            <label
              for="url"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              RSS Feed URL <span class="text-red-500">*</span>
            </label>
            <input
              id="url"
              name="url"
              type="url"
              value={(state?.url as string) ?? ""}
              placeholder="https://example.com/feed.xml"
              class="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:focus:border-white dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isGuest || undefined}
              safe
            />
            <FieldError message={validation?.url} />
          </div>

          {/* Language */}
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
              class="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:focus:border-white dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isGuest || undefined}
            >
              {RSS_LANGUAGES.map((lang) => (
                <option
                  value={lang.code}
                  selected={selectedLanguage === lang.code || undefined}
                >
                  {lang.label}
                </option>
              ))}
            </select>
            <FieldError message={validation?.language} />
          </div>

          {/* Is Owner */}
          <div>
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_owner"
                value="on"
                checked={isOwnerChecked || undefined}
                class="mt-0.5 h-4 w-4 rounded border-gray-300 text-black focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGuest || undefined}
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                I am the owner or author of this feed
              </span>
            </label>
          </div>

          {/* Terms */}
          <div class="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              You must agree to all policies before submitting:{" "}
              <span class="text-red-500">*</span>
            </p>

            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                value="confirmed"
                class="mt-0.5 h-4 w-4 rounded border-gray-300 text-black focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGuest || undefined}
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                I have read and agree to the{" "}
                <a
                  href="/legal/terms"
                  target="_blank"
                  class="underline font-medium"
                >
                  Terms of Service
                </a>
              </span>
            </label>
            <FieldError message={validation?.terms} />

            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="dpa"
                value="confirmed"
                class="mt-0.5 h-4 w-4 rounded border-gray-300 text-black focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGuest || undefined}
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                I have read and agree to the{" "}
                <a
                  href="/legal/dpa"
                  target="_blank"
                  class="underline font-medium"
                >
                  Data Processing Agreement
                </a>
              </span>
            </label>
            <FieldError message={validation?.dpa} />

            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="bots"
                value="confirmed"
                class="mt-0.5 h-4 w-4 rounded border-gray-300 text-black focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGuest || undefined}
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                I have read and agree to the{" "}
                <a
                  href="/legal/bots"
                  target="_blank"
                  class="underline font-medium"
                >
                  Bots &amp; Automation Policy
                </a>
              </span>
            </label>
            <FieldError message={validation?.bots} />

            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="copyright"
                value="confirmed"
                class="mt-0.5 h-4 w-4 rounded border-gray-300 text-black focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGuest || undefined}
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                I have read and agree to the{" "}
                <a
                  href="/legal/dmca"
                  target="_blank"
                  class="underline font-medium"
                >
                  Copyright Policy
                </a>
              </span>
            </label>
            <FieldError message={validation?.copyright} />
          </div>

          {/* What we don't accept */}
          <details class="rounded-lg border border-gray-200 dark:border-gray-700 -mx-1">
            <summary class="px-4 py-3 cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200 select-none">
              What types of feeds will NOT be accepted?
            </summary>
            <div class="px-4 pb-4">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Suggestions containing any of the following will be rejected:
              </p>
              <ul class="space-y-1">
                {NOT_ACCEPTED_REASONS.map((reason) => (
                  <li class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span class="mt-0.5 text-red-500 shrink-0">✕</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <Button type="submit" variant="auth" disabled={isGuest}>
            Submit Suggestion
          </Button>
        </form>
      </div>
    </DefaultLayout>
  );
}
