import type { Children } from "@kitajs/html";

/**
 * BaseLayout — a minimal pass-through layout with no nav or footer.
 * Equivalent to views/layouts/base.ejs which only outputs <%- body %>.
 * Used for HTMX partial responses that don't need a full page shell.
 */
type BaseLayoutProps = {
  children?: Children;
};

export function BaseLayout({ children }: BaseLayoutProps) {
  return <>{children}</>;
}
