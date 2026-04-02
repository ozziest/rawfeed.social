import type { Children } from "@kitajs/html";
import type { BaseProps } from "../../types/views";
import { Head } from "../components/layout/Head";

type AuthLayoutProps = BaseProps & {
  children?: Children;
  useTurnstile?: boolean;
};

export function AuthLayout({
  title,
  description,
  keywords,
  canonical,
  isProd,
  theme,
  children,
  useTurnstile,
}: AuthLayoutProps) {
  return (
    <html lang="en" class={theme === "dark" ? "dark" : undefined}>
      <Head
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        isProd={isProd}
        useTurnstile={useTurnstile}
      />
      <body class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
