/** @jsxImportSource @kitajs/html */
import type { TokenPayload } from "../../helpers/tokens";
import { asset } from "../../helpers/asset";

type NavbarProps = {
  mode: "root" | "custom";
  loggedUser?: TokenPayload;
};

export function Navbar({ mode, loggedUser }: NavbarProps) {
  if (mode !== "root") return "";

  return (
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          {/* Logo/Brand */}
          <a
            href="/"
            class="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-black transition-colors"
          >
            <img
              src={asset("/public/favicon.svg")}
              alt="rawfeed.social"
              class="w-6 h-6"
            />
            rawfeed.social
          </a>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-button"
            class="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Desktop Navigation Links */}
          <div class="hidden md:flex items-center gap-4">
            <a
              href="/"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Feed
            </a>
            <a
              href="/about"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </a>
            <a
              href="/blog"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Blog
            </a>
            {!loggedUser ? (
              <>
                <a
                  href="/auth/login"
                  class="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </a>
                <a
                  href="/auth/register"
                  class="text-gray-600 hover:text-gray-900 transition-colors"
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
                  class="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  @<span safe>{loggedUser.username}</span>
                </a>
                <a
                  href="/user/settings"
                  class="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Settings
                </a>
                <form method="GET" action="/auth/logout">
                  <button
                    type="submit"
                    class="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
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

        {/* Mobile Menu */}
        <div id="mobile-menu" class="hidden md:hidden mt-4 pb-2">
          <div class="flex flex-col gap-3">
            <a
              href="/about"
              class="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
            >
              About
            </a>
            <a
              href="/blog"
              class="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
            >
              Blog
            </a>
            <a
              href="/"
              class="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
            >
              Feed
            </a>
            {!loggedUser ? (
              <a
                href="/auth/login"
                class="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
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
                  class="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                >
                  @<span safe>{loggedUser.username}</span>
                </a>
                <a
                  href="/user/settings"
                  class="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                >
                  Settings
                </a>
                <form method="GET" action="/auth/logout">
                  <button
                    type="submit"
                    class="text-left w-full text-gray-600 hover:text-red-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors cursor-pointer"
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
