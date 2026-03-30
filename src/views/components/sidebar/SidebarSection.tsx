import type { Children } from "@kitajs/html";

export type SidebarSectionProps = {
  title: string;
  icon?: Children;
  children: Children;
  className?: string;
};

export function SidebarSection({
  title,
  icon,
  children,
  className = "",
}: SidebarSectionProps) {
  return (
    <div
      class={
        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 " +
        className
      }
    >
      <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
        <span>{icon}</span>
        <span safe>{title}</span>
      </h3>
      {children}
    </div>
  );
}
