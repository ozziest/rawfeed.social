import sanitizeHtml from "sanitize-html";
import crypto from "crypto";

/**
 * Sanitizes raw HTML produced from Markdown conversion.
 * Allows a safe subset of tags while stripping anything dangerous.
 * Forces external links to open in a new tab with rel="noopener noreferrer".
 */
export const sanitizeBlogHtml = (html: string): string => {
  return sanitizeHtml(html, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "hr",
      "strong",
      "em",
      "del",
      "s",
      "u",
      "mark",
      "a",
      "img",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "div",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      code: ["class"],
      pre: ["class"],
      th: ["scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        const isExternal = /^https?:\/\//i.test(href);
        return {
          tagName,
          attribs: {
            ...attribs,
            ...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {}),
          },
        };
      },
    },
  });
};

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
