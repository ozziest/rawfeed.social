/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../types/views";
import type { Selectable } from "kysely";
import type { Users } from "../../types/database";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { getAvatar } from "../../helpers/common";

type ExploreBotsMembersProps = BaseProps & {
  users: Selectable<Users>[];
  pageTitle: string;
  pageDescription: string;
};

export function ExploreBotsMembers(props: ExploreBotsMembersProps) {
  const { users, pageTitle, pageDescription } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-2" safe>
            {pageTitle}
          </h1>
          <p class="text-gray-600" safe>
            {pageDescription}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex items-start gap-3">
                <a href={`/u/${user.username}`}>
                  <img
                    src={getAvatar(user)}
                    alt={user.name || user.username}
                    class="w-12 h-12 rounded-full object-cover"
                  />
                </a>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <a
                      href={`/u/${user.username}`}
                      class="font-semibold text-gray-900 hover:underline truncate"
                      safe
                    >
                      {user.name || user.username}
                    </a>
                  </div>

                  <p class="text-sm text-gray-500 mb-2" safe>
                    @{user.username}
                  </p>

                  <div>
                    {user.bio ? (
                      <p class="text-sm text-gray-700 mb-3 line-clamp-2" safe>
                        {user.bio}
                      </p>
                    ) : undefined}
                  </div>
                </div>
              </div>

              <div>
                {(user as any).rss_source ? (
                  <div class="mt-3 pt-3 border-t border-gray-100">
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      <span class="truncate" safe>
                        {(user as any).rss_source}
                      </span>
                    </div>
                  </div>
                ) : undefined}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
