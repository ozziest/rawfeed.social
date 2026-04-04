import { Children, Component } from "@kitajs/html";
import classNames from "classnames";

type Props = {
  to: string;
  count?: number;
  icon: Children;
};

export function PostStat({ to, icon, count }: Props) {
  return (
    <a
      href={to}
      class={classNames([
        "flex items-center gap-1 text-gray-600 transition-colors py-1 px-2 rounded-md",
        "hover:text-black hover:bg-gray-200",
        "dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700",
      ])}
    >
      {icon}
      <span>{count ?? 0} </span>
    </a>
  );
}
