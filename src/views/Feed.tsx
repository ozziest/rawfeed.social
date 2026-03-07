import type { BaseProps } from "../types/views";
import type { PostWithContent } from "../types/relations";
import type { Selectable } from "kysely";
import type { Users } from "../types/database";
import type { DailyReportItem } from "../types/shared";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Share } from "./partials/Share";
import { Posts } from "./partials/Posts";
import { Sidebar } from "./partials/Sidebar";

type FeedProps = BaseProps & {
  posts: PostWithContent[];
  report?: DailyReportItem[];
  lastMembers?: Selectable<Users>[];
  bots?: Selectable<Users>[];
  nextCursor: string | null;
  csrfToken: string;
};

export function Feed(props: FeedProps) {
  const {
    posts,
    report,
    lastMembers,
    bots,
    nextCursor,
    csrfToken,
    loggedUser,
    validation,
    state,
  } = props;

  return (
    <DefaultLayout {...props}>
      <h1 class="sr-only">
        Chronological Social Feed Without Algorithmic Manipulation
      </h1>

      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="flex justify-between gap-4">
          <div class="grow">
            <Share
              loggedUser={loggedUser}
              csrfToken={csrfToken}
              validation={validation}
              formData={state as Record<string, unknown>}
            />

            <div class="space-y-4">
              <Posts
                posts={posts}
                loggedUser={loggedUser}
                csrfToken={csrfToken}
              />
              {nextCursor ? (
                <div
                  hx-get={`/feed/next/${nextCursor}`}
                  hx-trigger="intersect once"
                  hx-swap="outerHTML"
                  class="h-20 flex items-center justify-center"
                >
                  <div class="animate-pulse text-gray-500">Loading more...</div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div class="min-w-64 max-w-64 hidden lg:block">
            <Sidebar report={report} lastMembers={lastMembers} bots={bots} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
