type MentionLinkProps = {
  username: string;
};

export function MentionLink({ username }: MentionLinkProps) {
  const safeUsername = encodeURIComponent(username.replace("@", ""));
  return (
    <a
      href={`/u/${safeUsername}`}
      class="relative z-10 transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900"
    >
      <span safe>{username}</span>
    </a>
  );
}
