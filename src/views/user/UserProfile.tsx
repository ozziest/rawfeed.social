/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../types/views";
import type { PostWithContent } from "../../types/relations";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Profile } from "../partials/Profile";
import { Posts } from "../partials/Posts";

type UserProfileProps = BaseProps & {
  posts: PostWithContent[];
  nextCursor: string | null;
  nextCursorUserId: string;
  csrfToken: string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
};

export function UserProfile(props: UserProfileProps) {
  const {
    posts,
    nextCursor,
    nextCursorUserId,
    csrfToken,
    followerCount,
    followingCount,
    isFollowing,
    profileUser,
    domainUser,
    loggedUser,
    validation,
  } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <Profile
          profileUser={profileUser}
          domainUser={domainUser}
          loggedUser={loggedUser}
          followerCount={followerCount}
          followingCount={followingCount}
          isFollowing={isFollowing}
          csrfToken={csrfToken}
          validation={validation}
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
              <div class="animate-pulse text-gray-500">Loading more...</div>
            </div>
          ) : undefined}
        </div>
      </div>
    </DefaultLayout>
  );
}
