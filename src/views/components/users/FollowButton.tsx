import { CsrfToken } from "../forms/CsrfToken";

type FollowButtonProps = {
  targetUsername: string;
  targetUserId: string;
  isFollowing: boolean;
  csrfToken: string;
  /** Override the hx-target element id. Defaults to the form's own id. */
  hxTarget?: string;
};

export function FollowButton({
  targetUsername,
  targetUserId,
  isFollowing,
  csrfToken,
  hxTarget,
}: FollowButtonProps) {
  const action = isFollowing ? "unfollow" : "follow";
  const formId = `follow-btn-${targetUserId}`;
  const target = hxTarget ?? formId;

  return (
    <form
      id={formId}
      method="POST"
      action={`/${action}/${targetUsername}`}
      hx-post={`/${action}/${targetUsername}`}
      hx-target={`#${target}`}
      hx-swap="outerHTML"
    >
      <CsrfToken token={csrfToken} />
      <button
        type="submit"
        class={
          isFollowing
            ? "px-4 py-1.5 text-sm font-medium rounded-full transition-colors text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-800"
            : "px-4 py-1.5 text-sm font-medium rounded-full transition-colors text-white bg-black hover:bg-gray-800"
        }
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </form>
  );
}
