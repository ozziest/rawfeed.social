
type RawHtmlProps = {
  /** Trusted HTML string — only use with sanitized or server-generated content. */
  html: string;
  id?: string;
  class?: string;
};

/**
 * Renders a trusted HTML string directly without escaping.
 * Never pass user-generated content here unless it has been sanitized first.
 */
export function RawHtml({ html, id, class: className }: RawHtmlProps) {
  const attrs = [
    id ? `id="${id}"` : "",
    className ? `class="${className}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `<div ${attrs}>${html}</div>` as "safe";
}
