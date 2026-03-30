type MentionLinkProps = {
  username: string;
};

export function MentionLink({ username }: MentionLinkProps) {
  const safeUsername = encodeURIComponent(username.replace("@", ""));
  return (
    <a
      href={`/u/${safeUsername}`}
      class="relative z-10 transition-colors font-semibold text-neutral-800 dark:text-gray-300 hover:underline hover:text-neutral-900 dark:hover:text-gray-100"
    >
      <span safe>{username}</span>
    </a>
  );
}
