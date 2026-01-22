import sanitizeHtml from "sanitize-html";

export const sanitize = (content: string) => {
  return sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "recursiveEscape",
  })
    .trim()
    .replace(/\n{3,}/g, "\n\n");
};
