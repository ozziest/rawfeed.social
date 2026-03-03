/** @jsxImportSource @kitajs/html */
import sanitizeHtml from "sanitize-html";
import type { PostWithContent } from "../../types/relations";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function MentionLink({ username }: { username: string }) {
  const safeUsername = encodeURIComponent(username.replace("@", ""));
  return (
    <a
      href={`/u/${safeUsername}`}
      class="transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900"
    >
      <span safe>{username}</span>
    </a>
  );
}

function HashtagLink({
  hashtag,
  display,
}: {
  hashtag: string;
  display: string;
}) {
  const safeHashtag = encodeURIComponent(hashtag);
  return (
    <a
      href={`/tags/${safeHashtag}`}
      class="transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900"
    >
      <span safe>{display}</span>
    </a>
  );
}

function ExternalLink({ code, link }: { code: string; link: string }) {
  const safeCode = encodeURIComponent(code);

  let displayText = link;
  try {
    const url = new URL(link);
    const domain = url.hostname.replace("www.", "");
    const path = url.pathname + url.search;
    if (link.length > 50) {
      displayText =
        path.length > 25
          ? `${domain}${path.substring(0, 22)}...`
          : `${domain}${path}`;
    }
  } catch {
    displayText = link.length > 50 ? link.substring(0, 47) + "..." : link;
  }

  return (
    <a
      href={`/redirect/${safeCode}`}
      target="_blank"
      rel="noopener noreferrer"
      class="transition-colors font-medium text-black hover:underline hover:text-gray-700"
    >
      <span safe>{displayText}</span>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

type PostContentProps = {
  post: PostWithContent;
};

export function PostContent({ post }: PostContentProps): JSX.Element {
  const safeContent = sanitizeHtml(post.content, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const regex = /(@[\p{L}\p{N}_]+|#[\p{L}\p{N}_]+|https?:\/\/[^\s]+|\n)/gu;
  const parts = safeContent.split(regex).filter(Boolean);

  const elements = parts.map((part) => {
    if (part === "\n") {
      return <br />;
    }

    // Mentions
    const mention = (post.mentions || []).find((m) => m.username === part);
    if (mention) {
      return <MentionLink username={mention.username} />;
    }

    // Hashtags
    const hashtag = (post.hashtags || []).find((h) => `#${h.hashtag}` === part);
    if (hashtag) {
      return <HashtagLink hashtag={hashtag.hashtag} display={part} />;
    }

    // Links
    const linkMatch = (post.links || []).find(
      (l) => l.linkDetail?.link === part,
    );
    if (linkMatch?.linkDetail) {
      if (!/^https?:\/\//i.test(linkMatch.linkDetail.link)) {
        return <span safe>{part}</span>;
      }
      if (linkMatch.linkDetail.link.length > 400) {
        return <span safe>{part.substring(0, 50) + "..."}</span>;
      }
      return (
        <ExternalLink
          code={linkMatch.linkDetail.code}
          link={linkMatch.linkDetail.link}
        />
      );
    }

    return <span safe>{part}</span>;
  });

  return <>{elements}</>;
}
