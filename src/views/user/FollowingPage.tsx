import type { BaseProps } from "../../types/views";
import type { FollowWithUser } from "../../types/relations";
import type { Selectable } from "kysely";
import type { Users } from "../../types/database";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { ChevronLeftIcon } from "../components/icons/ChevronLeftIcon";
import { UserListItems } from "../partials/UserListItems";

type FollowingPageProps = BaseProps & {
  profileUser: Selectable<Users>;
  items: FollowWithUser[];
  nextCursor?: string | null;
  isFollowingMap: Record<string, boolean>;
  csrfToken: string;
};

export function FollowingPage(props: FollowingPageProps) {
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
            <ChevronLeftIcon class="w-4 h-4" />
            Back to <span safe>@{profileUser.username}</span>
          </a>
          <h1 class="text-2xl font-bold text-gray-900">Following</h1>
          <p class="text-gray-500 text-sm mt-1">
            People <strong safe>@{profileUser.username}</strong> follows
          </p>
        </div>

        <div class="space-y-3">
          {items.length === 0 ? (
            <p class="text-gray-500 text-center py-12">
              Not following anyone yet.
            </p>
          ) : (
            <UserListItems
              items={items}
              nextCursor={nextCursor}
              listRoute={`/u/${profileUser.username}/following/next/`}
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
