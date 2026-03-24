type UserStatLinkProps = {
  href: string;
  count: number;
  label: string;
};

export function UserStatLink({ href, count, label }: UserStatLinkProps) {
  return (
    <a href={href} class="group flex flex-col items-start">
      <strong class="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white leading-none">
        {count}
      </strong>
      <span class="text-xs text-gray-500 dark:text-gray-400 mt-0.5" safe>
        {label}
      </span>
    </a>
  );
}
