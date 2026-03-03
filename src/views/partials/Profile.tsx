/** @jsxImportSource @kitajs/html */
import type { Selectable } from "kysely";
import type { Users } from "../../types/database";
import type { TokenPayload } from "../../helpers/tokens";
import { getAvatar } from "../../helpers/common";
import { FollowButton } from "./FollowButton";
import { Share } from "./Share";

type ProfileProps = {
  profileUser?: Selectable<Users>;
  domainUser?: Selectable<Users>;
  loggedUser?: TokenPayload;
  followerCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
  csrfToken: string;
  validation?: Record<string, string>;
  formData?: Record<string, unknown>;
  activeHashtag?: string;
};

export function Profile({
  profileUser,
  domainUser,
  loggedUser,
  followerCount,
  followingCount,
  isFollowing = false,
  csrfToken,
  validation,
  formData,
  activeHashtag,
}: ProfileProps) {
  const user = profileUser ?? domainUser;
  if (!user) return "";

  const profileLink = user.link?.replace(/^https?:\/\//, "");

  return (
    <>
      <div class="bg-white rounded-xl mb-6 shadow-sm overflow-hidden">
        {/* Accent bar */}
        <div class="h-1.5 bg-linear-to-r from-gray-900 via-gray-600 to-gray-400"></div>

        <div class="px-4 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-6">
          <div class="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 sm:gap-x-4">
            {/* Row 1, col 1 — Avatar */}
            <img
              src={getAvatar(user)}
              class="w-12 h-12 sm:w-20 sm:h-20 rounded-full border-2 border-white shadow shrink-0"
            />

            {/* Row 1, col 2 — Name + username */}
            <div class="min-w-0 flex flex-col justify-center">
              <div class="flex items-center gap-2 flex-wrap min-w-0">
                <h1
                  class="text-lg sm:text-2xl font-bold text-gray-900 leading-tight"
                  safe
                >
                  {user.name}
                </h1>
                {user.bot_type ? (
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300 shrink-0">
                    🤖 Bot
                  </span>
                ) : (
                  ""
                )}
              </div>
              <p class="text-xs sm:text-sm text-gray-400 mt-0.5">
                @<span safe>{user.username}</span>
              </p>
            </div>

            {/* Row 1, col 3 — RSS badge */}
            {!user.bot_type ? (
              <a
                href={`/u/${user.username}/rss`}
                class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors shrink-0"
                title="RSS Feed"
                target="_blank"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
                </svg>
                RSS
              </a>
            ) : (
              <div></div>
            )}

            {/* Row 2 — Bio, link, stats: full width */}
            <div class="col-span-3 mt-3">
              {user.bio ? (
                <p
                  class="text-sm sm:text-base text-gray-600 leading-relaxed mb-3"
                  safe
                >
                  {user.bio}
                </p>
              ) : (
                ""
              )}

              {user.link ? (
                <div class="flex justify-start mb-3">
                  <a
                    href={user.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-black hover:underline break-all"
                  >
                    <svg
                      class="w-3.5 h-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <span safe>{profileLink}</span>
                  </a>
                </div>
              ) : (
                ""
              )}

              {/* Stats + actions footer */}
              <div class="pt-3 border-t border-gray-100 flex flex-row items-center justify-between gap-3">
                {followerCount !== undefined ? (
                  <div id={`follow-count-${user.id}`} class="flex gap-6">
                    <a
                      href={`/u/${user.username}/followers`}
                      class="group flex flex-col items-start"
                    >
                      <strong class="text-base font-bold text-gray-900 group-hover:text-black leading-none">
                        {followerCount ?? 0}
                      </strong>
                      <span class="text-xs text-gray-500 mt-0.5">
                        followers
                      </span>
                    </a>
                    <a
                      href={`/u/${user.username}/following`}
                      class="group flex flex-col items-start"
                    >
                      <strong class="text-base font-bold text-gray-900 group-hover:text-black leading-none">
                        {followingCount ?? 0}
                      </strong>
                      <span class="text-xs text-gray-500 mt-0.5">
                        following
                      </span>
                    </a>
                  </div>
                ) : (
                  ""
                )}

                <div class="flex items-center gap-2">
                  {loggedUser && loggedUser.userId !== user.id ? (
                    <FollowButton
                      targetUsername={user.username}
                      targetUserId={user.id}
                      isFollowing={isFollowing}
                      csrfToken={csrfToken}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loggedUser?.userId === profileUser?.id ? (
        <Share
          loggedUser={loggedUser}
          csrfToken={csrfToken}
          validation={validation}
          formData={formData}
          activeHashtag={activeHashtag}
        />
      ) : (
        ""
      )}
    </>
  );
}
