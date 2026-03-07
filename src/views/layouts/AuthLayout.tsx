import type { Children } from "@kitajs/html";
import type { BaseProps } from "../../types/views";
import { Head } from "../components/layout/Head";

type AuthLayoutProps = BaseProps & { children?: Children };

export function AuthLayout({
  title,
  description,
  keywords,
  canonical,
  isProd,
  children,
}: AuthLayoutProps) {
  return (
    <html lang="en">
      <Head
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        isProd={isProd}
      />
      <body class="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
