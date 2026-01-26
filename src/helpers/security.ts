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
