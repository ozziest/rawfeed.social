import type { TokenPayload } from "../../../helpers/tokens";
import { asset } from "../../../helpers/asset";
import { MenuIcon } from "../icons/MenuIcon";
import { ThemeToggle } from "./ThemeToggle";

type NavbarProps = {
  mode: "root" | "custom";
  loggedUser?: TokenPayload;
  theme: "dark" | "light" | "system";
};

export function Navbar({ mode, loggedUser, theme }: NavbarProps) {
  if (mode !== "root") return "";

  return (
    <nav class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          {/* Logo/Brand */}
          <a
            href="/"
            class="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors"
          >
            <img
              src={asset("/public/favicon.svg")}
              alt="rawfeed.social"
              class="w-6 h-6"
            />
            rawfeed.social
          </a>

          {/* Mobile controls */}
          <div class="flex items-center gap-1 md:hidden">
            <ThemeToggle theme={theme} />
            <button
              id="mobile-menu-button"
              class="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <MenuIcon class="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div class="hidden md:flex items-center gap-4">
            <a
              href="/"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Feed
            </a>
            <a
              href="/about"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="/blog"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Blog
            </a>
            {!loggedUser ? (
              <>
                <a
                  href="/auth/login"
                  class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Login
                </a>
                <a
                  href="/auth/register"
                  class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Register
                </a>
              </>
            ) : (
              ""
            )}
            {loggedUser ? (
              <>
                <a
                  href={`/u/${loggedUser.username}`}
                  class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  @<span safe>{loggedUser.username}</span>
                </a>
                <a
                  href="/user/settings"
                  class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Settings
                </a>
                <form method="GET" action="/auth/logout">
                  <button
                    type="submit"
                    class="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              ""
            )}
            <ThemeToggle theme={theme} />
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" class="hidden md:hidden mt-4 pb-2">
          <div class="flex flex-col gap-3">
            <a
              href="/about"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
            >
              About
            </a>
            <a
              href="/blog"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
            >
              Blog
            </a>
            <a
              href="/"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
            >
              Feed
            </a>
            {!loggedUser ? (
              <a
                href="/auth/login"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
              >
                Login
              </a>
            ) : (
              ""
            )}
            {loggedUser ? (
              <>
                <a
                  href={`/u/${loggedUser.username}`}
                  class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
                >
                  @<span safe>{loggedUser.username}</span>
                </a>
                <a
                  href="/user/settings"
                  class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
                >
                  Settings
                </a>
                <form method="GET" action="/auth/logout">
                  <button
                    type="submit"
                    class="text-left w-full text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
