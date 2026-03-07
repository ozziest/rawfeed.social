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
      class="block bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-transparent"
    >
      <div class="flex items-center gap-4">
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          {children}
        </div>
        <ChevronRightIcon class="w-5 h-5 text-gray-400 shrink-0" />
      </div>
    </a>
  );
}
