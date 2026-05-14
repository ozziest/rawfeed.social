import type { BaseProps } from "../../types/views";
import type { Selectable } from "kysely";
import type { Users } from "../../types/database";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { BotUserCard } from "../components/users/BotUserCard";

type ExploreBotsMembersProps = BaseProps & {
  users: Selectable<Users>[];
  pageTitle: string;
  pageDescription: string;
};

export function ExploreBotsMembers(props: ExploreBotsMembersProps) {
  const { users, pageTitle, pageDescription, loggedUser } = props;
  const isBotsPage = pageTitle === "RSS Bots";
  const isAdmin = loggedUser?.isAdmin === true;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
              safe
            >
              {pageTitle}
            </h1>
            <p class="text-gray-600 dark:text-gray-400" safe>
              {pageDescription}
            </p>
          </div>
          {isBotsPage ? (
            <div class="shrink-0 flex flex-col items-end gap-2">
              <a
                href="/rss/suggest"
                class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                + Suggest a Feed
              </a>
              {isAdmin ? (
                <a
                  href="/admin/rss-suggestions"
                  class="text-xs text-gray-500 dark:text-gray-400 underline hover:text-black dark:hover:text-white whitespace-nowrap"
                >
                  View all suggestions →
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <BotUserCard user={user as any} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
