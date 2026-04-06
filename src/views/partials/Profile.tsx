import type { Selectable } from "kysely";
import type { RssSources, Users } from "../../types/database";
import type { TokenPayload } from "../../helpers/tokens";
import { getAvatar } from "../../helpers/common";
import { Avatar } from "../components/users/Avatar";
import { FollowButton } from "../components/users/FollowButton";
import { Share } from "./Share";
import { RssFeedLink } from "../components/users/RssFeedLink";
import { BotBadge } from "../components/users/BotBadge";
import { LinkIcon } from "../components/icons/LinkIcon";

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
  rssSource?: RssSources;
};

const toProfileLink = (user: Selectable<Users>, rssSource?: RssSources) => {
  if (user.link) {
    return user.link;
  }

  if (!rssSource) {
    return undefined;
  }

  const url = new URL(rssSource.url);
  return url.origin;
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
  rssSource,
}: ProfileProps) {
  const user = profileUser ?? domainUser;
  if (!user) return "";

  const link = toProfileLink(user, rssSource);
  const profileLink = link?.replace(/^https?:\/\//, "");

  return (
    <>
      <div class="bg-white dark:bg-gray-800 rounded-xl mb-6 shadow-sm overflow-hidden">
        {/* Accent bar */}
        <div class="h-1.5 bg-linear-to-r from-gray-900 via-gray-600 to-gray-400"></div>

        <div class="px-4 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-6">
          <div class="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 sm:gap-x-4">
            {/* Row 1, col 1 — Avatar */}
            <Avatar
              src={getAvatar(user)}
              alt={user.name}
              size={80}
              className="w-12 h-12 sm:w-20 sm:h-20 border-2 border-white shadow shrink-0"
            />

            {/* Row 1, col 2 — Name + username */}
            <div class="min-w-0 flex flex-col justify-center">
              <div class="flex items-center gap-2 flex-wrap min-w-0">
                <h1
                  class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight"
                  safe
                >
                  {user.name}
                </h1>
                {user.bot_type ? <BotBadge /> : ""}
              </div>
              <p class="text-xs sm:text-sm text-gray-400 mt-0.5">
                @<span safe>{user.username}</span>
              </p>
            </div>

            {/* Row 1, col 3 — RSS badge */}
            {!user.bot_type ? (
              <RssFeedLink username={user.username} />
            ) : (
              <div></div>
            )}

            {/* Row 2 — Bio, link, stats: full width */}
            <div class="col-span-3 mt-3">
              {user.bio ? (
                <p
                  class="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3"
                  safe
                >
                  {user.bio}
                </p>
              ) : (
                ""
              )}

              {link ? (
                <div class="flex justify-start mb-3">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline break-all"
                  >
                    <LinkIcon class="w-3.5 h-3.5 shrink-0" />
                    <span safe>{profileLink}</span>
                  </a>
                </div>
              ) : (
                ""
              )}

              {/* Stats + actions footer */}
              <div class="pt-3 border-t border-gray-100 dark:border-gray-700 flex flex-row items-center justify-between gap-3">
                {followerCount !== undefined ? (
                  <div id={`follow-count-${user.id}`} class="flex gap-6">
                    <a
                      href={`/u/${user.username}/followers`}
                      class="group flex flex-col items-start"
                    >
                      <strong class="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white leading-none">
                        {followerCount ?? 0}
                      </strong>
                      <span class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        followers
                      </span>
                    </a>
                    <a
                      href={`/u/${user.username}/following`}
                      class="group flex flex-col items-start"
                    >
                      <strong class="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white leading-none">
                        {followingCount ?? 0}
                      </strong>
                      <span class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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
