/** @jsxImportSource @kitajs/html */

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
  return (
    <div id={id} class={className}>
      {html as JSX.Element}
    </div>
  );
}
