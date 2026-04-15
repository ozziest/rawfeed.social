import type { BaseProps } from "../../types/views";
import type { RssSuggestionRow } from "../../types/shared";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { FlashMessages } from "../partials/FlashMessages";
import { RssSuggestionMeta } from "./RssSuggestionMeta";
import { RssSuggestionTestFeed } from "./RssSuggestionTestFeed";
import { RssSuggestionAcceptForm } from "./RssSuggestionAcceptForm";
import { RssSuggestionRejectForm } from "./RssSuggestionRejectForm";

type RssSuggestionDetailProps = BaseProps & {
  suggestion: RssSuggestionRow;
  csrfToken: string;
};

export function RssSuggestionDetail(props: RssSuggestionDetailProps) {
  const { suggestion, csrfToken, validation, state } = props;
  const isPending = suggestion.status === "pending";

  return (
    <DefaultLayout {...props}>
      <div class="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div class="mb-2">
          <a
            href="/admin/rss-suggestions"
            class="text-sm text-gray-500 hover:text-black dark:hover:text-white underline "
          >
            ← Back to suggestions
          </a>
        </div>

        <FlashMessages state={props.state} />

        {/* Suggestion metadata */}
        <RssSuggestionMeta suggestion={suggestion} />

        {/* Test Feed */}
        <RssSuggestionTestFeed suggestionId={suggestion.id} />

        {/* Accept form */}
        {isPending ? (
          <RssSuggestionAcceptForm
            suggestionId={suggestion.id}
            suggestionLanguage={suggestion.language}
            csrfToken={csrfToken}
            state={state}
            validation={validation}
          />
        ) : null}

        {/* Reject form */}
        {isPending ? (
          <RssSuggestionRejectForm
            suggestionId={suggestion.id}
            csrfToken={csrfToken}
            state={state}
            validation={validation}
          />
        ) : null}
      </div>
    </DefaultLayout>
  );
}
