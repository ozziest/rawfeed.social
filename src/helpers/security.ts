import sanitizeHtml from "sanitize-html";
import crypto from "crypto";

export const sanitize = (content: string) => {
  return sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "recursiveEscape",
  })
    .trim()
    .replace(/\n{3,}/g, "\n\n");
};

export const generateDomainVerificationToken = () => {
  return `rawfeed-verify-${crypto.randomBytes(16).toString("hex")}`;
};

/**
 * Returns the pathname+search of the Referer header if it is same-origin
 * (matches APP_URL), otherwise returns the provided fallback path.
 * Prevents open-redirect attacks caused by spoofed Referer headers.
 */
export const safeReferer = (
  referer: string | undefined,
  fallback: string,
): string => {
  if (!referer) return fallback;
  const appUrl = (process.env.APP_URL || "").replace(/\/$/, "");
  if (!appUrl) return fallback;
  try {
    const ref = new URL(referer);
    const app = new URL(appUrl);
    if (ref.origin === app.origin) {
      return ref.pathname + ref.search;
    }
  } catch {
    // malformed URL — fall through to fallback
  }
  return fallback;
};
