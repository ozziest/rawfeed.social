import type { Children } from "@kitajs/html";
import type { BaseProps } from "../../types/views";
import { Head } from "../components/layout/Head";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { FooterCustom } from "../components/layout/FooterCustom";

type DefaultLayoutProps = BaseProps & { children?: Children };

export function DefaultLayout({
  title,
  description,
  keywords,
  canonical,
  isProd,
  mode,
  loggedUser,
  children,
}: DefaultLayoutProps) {
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
        {mode === "custom" ? <FooterCustom /> : <Footer />}
      </body>
    </html>
  );
}
