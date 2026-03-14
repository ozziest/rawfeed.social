type HashtagLinkProps = {
  hashtag: string;
  display: string;
};

export function HashtagLink({ hashtag, display }: HashtagLinkProps) {
  const safeHashtag = encodeURIComponent(hashtag);
  return (
    <a
      href={`/tags/${safeHashtag}`}
      class="relative z-10 transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900"
    >
      <span safe>{display}</span>
    </a>
  );
}
