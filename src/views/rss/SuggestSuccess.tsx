import type { BaseProps } from "../../types/views";
import { DefaultLayout } from "../layouts/DefaultLayout";

type SuggestSuccessProps = BaseProps;

export function SuggestSuccess(props: SuggestSuccessProps) {
  return (
    <DefaultLayout {...props}>
      <div class="max-w-lg mx-auto px-4 py-16 text-center">
        <div class="mb-4 text-4xl">🎉</div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Suggestion Submitted!
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Thank you for suggesting a feed. Our moderation team will review it
          and get back to you. Please note that acceptance is not guaranteed.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/rss/suggest"
            class="inline-block px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Submit Another
          </a>
          <a
            href="/explore/bots"
            class="inline-block px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Browse RSS Bots
          </a>
        </div>
      </div>
    </DefaultLayout>
  );
}
