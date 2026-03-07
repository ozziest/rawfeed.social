import sanitizeHtml from "sanitize-html";
import type { PostWithContent } from "../../../types/relations";
import { MentionLink } from "./MentionLink";
import { HashtagLink } from "./HashtagLink";
import { ExternalLink } from "./ExternalLink";

type PostContentProps = {
  post: PostWithContent;
};

export function PostContent({ post }: PostContentProps) {
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

    const mention = (post.mentions || []).find((m) => m.username === part);
    if (mention) {
      return <MentionLink username={mention.username} />;
    }

    const hashtag = (post.hashtags || []).find((h) => `#${h.hashtag}` === part);
    if (hashtag) {
      return <HashtagLink hashtag={hashtag.hashtag} display={part} />;
    }

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
