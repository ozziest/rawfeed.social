import sanitizeHtml from "sanitize-html";
import { PostWithContent } from "../types/relations";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const formatPostContent = (data: PostWithContent): string => {
  const safeContent = sanitizeHtml(data.content, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const regex = /(@[\p{L}\p{N}_]+|#[\p{L}\p{N}_]+|https?:\/\/[^\s]+|\n)/gu;
  const parts = safeContent.split(regex);

  const htmlParts = parts
    .filter((part) => part)
    .map((part: string) => {
      if (part === "\n") {
        return "<br>";
      }

      // Mentions
      const mention = (data.mentions || []).find(
        (item) => item.username === part,
      );
      if (mention) {
        const safeUsername = encodeURIComponent(
          mention.username.replace("@", ""),
        );
        return `<a href="/u/${safeUsername}" class="transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900">${escapeHtml(part)}</a>`;
      }

      // Hashtags
      const hashtag = (data?.hashtags || []).find(
        (item) => `#${item.hashtag}` === part,
      );
      if (hashtag) {
        const safeHashtag = encodeURIComponent(hashtag.hashtag);
        return `<a href="/tags/${safeHashtag}" class="transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900">${escapeHtml(part)}</a>`;
      }

      // Links
      const linkMatch = (data?.links || []).find(
        (item) => item.linkDetail?.link === part,
      );
      if (linkMatch?.linkDetail) {
        if (!/^https?:\/\//i.test(linkMatch.linkDetail.link)) {
          return escapeHtml(part);
        }
        if (linkMatch.linkDetail.link.length > 400) {
          return escapeHtml(part.substring(0, 50) + "...");
        }

        const safeCode = encodeURIComponent(linkMatch.linkDetail.code);
        const displayText = escapeHtml(linkMatch.linkDetail.link);
        return `<a href="/redirect/${safeCode}" target="_blank" rel="noopener noreferrer" class="transition-colors font-medium text-indigo-800 hover:underline hover:text-indigo-950">${displayText}</a>`;
      }

      return escapeHtml(part);
    });

  return htmlParts.join("");
};
