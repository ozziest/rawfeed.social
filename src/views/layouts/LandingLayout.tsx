import type { Children } from "@kitajs/html";
import type { BaseProps } from "../../types/views";
import { Head } from "../components/layout/Head";
import { Navbar } from "../components/layout/Navbar";

type LandingLayoutProps = BaseProps & { children?: Children };

export function LandingLayout({
  title,
  description,
  keywords,
  canonical,
  isProd,
  mode,
  loggedUser,
  children,
}: LandingLayoutProps) {
  return (
    <html lang="en">
      <Head
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        isProd={isProd}
      />
      <body class="bg-gray-100 text-gray-900">
        <Navbar mode={mode} loggedUser={loggedUser} />
        {children}
      </body>
    </html>
  );
}
