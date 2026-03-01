import type { Children } from "@kitajs/html";
import type { TokenPayload } from "../helpers/tokens";
import type { Users } from "./database";

// ---------------------------------------------------------------------------
// Base props injected into every page component via useJsxViews base()
// ---------------------------------------------------------------------------
export type BaseProps = {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  validation: Record<string, string>;
  state: Record<string, unknown>;
  mode: "root" | "custom";
  loggedUser?: TokenPayload;
  domainUser?: Users;
  profileUser?: Users;
  isProd: boolean;
};

// Layout components accept all base props plus child content
export type LayoutProps = BaseProps & {
  children: Children;
};
