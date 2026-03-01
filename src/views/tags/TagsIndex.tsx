/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../types/views";
import type { PostWithContent } from "../../types/relations";
import type { Users } from "../../types/database";
import type { DailyReportItem } from "../../types/shared";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Share } from "../partials/Share";
import { Posts } from "../partials/Posts";
import { Sidebar } from "../partials/Sidebar";

type TagsIndexProps = BaseProps & {
  posts: PostWithContent[];
  report?: DailyReportItem[];
  lastMembers?: Users[];
  bots?: Users[];
  activeHashtag?: string;
  csrfToken: string;
};

export function TagsIndex(props: TagsIndexProps) {
  const {
    posts,
    report,
    lastMembers,
    bots,
    activeHashtag,
    csrfToken,
    loggedUser,
    validation,
    state,
  } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="flex justify-between gap-4">
          <div class="grow">
            <Share
              loggedUser={loggedUser}
              csrfToken={csrfToken}
              validation={validation}
              formData={state as Record<string, unknown>}
              activeHashtag={activeHashtag}
            />

            <div class="space-y-4">
              <Posts posts={posts} />
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
