import type { Children } from "@kitajs/html";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";

type SettingsNavItemProps = {
  href: string;
  title: string;
  children: Children;
};

export function SettingsNavItem({
  href,
  title,
  children,
}: SettingsNavItemProps) {
  return (
    <a
      href={href}
      class="block bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-transparent dark:border-gray-700"
    >
      <div class="flex items-center gap-4">
        <div class="flex-1 min-w-0">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1"
            safe
          >
            {title}
          </h3>
          {children}
        </div>
        <ChevronRightIcon class="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />
      </div>
    </a>
  );
}
