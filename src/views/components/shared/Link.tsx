import { Children } from "@kitajs/html";

type LinkProps = {
  to: string;
  children: Children;
  target?: JSX.HtmlAnchorTag["target"];
};

export function Link({ to, children, target }: LinkProps) {
  return (
    <a
      href={to}
      target={target}
      class="font-medium text-black dark:text-gray-200 hover:text-gray-700 dark:hover:text-white hover:underline"
    >
      {children}
    </a>
  );
}
