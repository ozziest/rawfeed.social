import type { BaseProps } from "../types/views";
import type { PostWithContent } from "../types/relations";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Profile } from "./partials/Profile";
import { Posts } from "./partials/Posts";

type IndexProps = BaseProps & {
  posts: PostWithContent[];
  nextCursor: string | null;
  nextCursorUserId: string;
  csrfToken: string;
};

export function Index(props: IndexProps) {
  const {
    posts,
    nextCursor,
    nextCursorUserId,
    csrfToken,
    loggedUser,
    profileUser,
    domainUser,
    validation,
    state,
  } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <Profile
          profileUser={profileUser}
          domainUser={domainUser}
          loggedUser={loggedUser}
          csrfToken={csrfToken}
          validation={validation}
          formData={state as Record<string, unknown>}
        />

        <div class="space-y-4">
          <Posts posts={posts} />
          {nextCursor ? (
            <div
              hx-get={`/posts/next/${nextCursor}/${nextCursorUserId}`}
              hx-trigger="intersect once"
              hx-swap="outerHTML"
              class="h-20 flex items-center justify-center"
            >
              <div class="animate-pulse text-gray-500 dark:text-gray-400">
                Loading more...
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <a
        href="https://rawfeed.social/about"
        target="_blank"
        rel="noopener noreferrer"
        class="fixed bottom-4 right-4 bg-black text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg hover:bg-gray-800 transition-colors duration-200 z-50 border border-white"
        style="text-decoration: none"
      >
        Created by rawfeed
      </a>
    </DefaultLayout>
  );
}
