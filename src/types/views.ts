import type { Children } from "@kitajs/html";
import type { Selectable } from "kysely";
import type { TokenPayload } from "../helpers/tokens";
import type { Users } from "./database";
import type { ThemeTypes } from "./shared";

// ---------------------------------------------------------------------------
// Base props injected into every page component via useViews base()
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
  domainUser?: Selectable<Users>;
  profileUser?: Selectable<Users>;
  isProd: boolean;
  theme: ThemeTypes;
  unreadNotifCount: number;
};

// Layout components accept all base props plus child content
export type LayoutProps = BaseProps & {
  children: Children;
};
