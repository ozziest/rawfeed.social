import type { Children } from "@kitajs/html";
import type { BaseProps } from "../../types/views";
import { Head } from "../components/layout/Head";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { FooterCustom } from "../components/layout/FooterCustom";
import { ProductHunt } from "../components/layout/ProductHunt";

type DefaultLayoutProps = BaseProps & { children?: Children };

export function DefaultLayout({
  title,
  description,
  keywords,
  canonical,
  isProd,
  mode,
  loggedUser,
  theme,
  children,
}: DefaultLayoutProps) {
  return (
    <html lang="en" class={theme === "dark" ? "dark" : undefined}>
      <Head
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        isProd={isProd}
      />
      <body class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar mode={mode} loggedUser={loggedUser} theme={theme} />
        {children}
        <ProductHunt />
        {mode === "custom" ? <FooterCustom /> : <Footer />}
      </body>
    </html>
  );
}
