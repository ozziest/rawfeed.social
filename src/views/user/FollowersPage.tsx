/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../types/views";
import type { FollowWithUser } from "../../types/relations";
import type { Users } from "../../types/database";
import type { TokenPayload } from "../../helpers/tokens";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { UserListItems } from "../partials/UserListItems";

type FollowersPageProps = BaseProps & {
  profileUser: Users;
  items: FollowWithUser[];
  nextCursor?: string | null;
  isFollowingMap: Record<string, boolean>;
  csrfToken: string;
};

export function FollowersPage(props: FollowersPageProps) {
  const {
    profileUser,
    items,
    nextCursor,
    isFollowingMap,
    csrfToken,
    loggedUser,
  } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <div class="mb-6">
          <a
            href={`/u/${profileUser.username}`}
            class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-3"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to <span safe>@{profileUser.username}</span>
          </a>
          <h1 class="text-2xl font-bold text-gray-900">Followers</h1>
          <p class="text-gray-500 text-sm mt-1">
            People who follow <strong safe>@{profileUser.username}</strong>
          </p>
        </div>

        <div class="space-y-3">
          {items.length === 0 ? (
            <p class="text-gray-500 text-center py-12">No followers yet.</p>
          ) : (
            <UserListItems
              items={items}
              nextCursor={nextCursor}
              listRoute={`/u/${profileUser.username}/followers/next/`}
              loggedUser={loggedUser}
              isFollowingMap={isFollowingMap}
              csrfToken={csrfToken}
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
