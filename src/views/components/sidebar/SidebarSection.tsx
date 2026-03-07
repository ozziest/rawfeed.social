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
    <div class={"bg-white border border-gray-200 rounded-lg p-4 " + className}>
      <h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}
