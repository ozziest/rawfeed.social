type AuthFormLinkProps = {
  label: string;
  href: string;
  linkText: string;
};

export function AuthFormLink({ label, href, linkText }: AuthFormLinkProps) {
  return (
    <div class="text-center text-sm">
      <span class="text-gray-600 dark:text-gray-400" safe>
        {label}
      </span>
      <a
        href={href}
        class="font-medium text-black dark:text-gray-200 hover:text-gray-700 dark:hover:text-white ml-1 underline"
        safe
      >
        {linkText}
      </a>
    </div>
  );
}
