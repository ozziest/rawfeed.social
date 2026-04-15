import type { Children } from "@kitajs/html";

type TabLinkProps = {
  href: string;
  active: boolean;
  children: Children;
};

export function TabLink({ href, active, children }: TabLinkProps) {
  return (
    <a
      href={href}
      class={
        "px-4 py-2 text-sm font-medium rounded-t-md border-b-2 -mb-px transition-colors " +
        (active
          ? "border-black dark:border-white text-black dark:text-white"
          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100")
      }
    >
      {children}
    </a>
  );
}
