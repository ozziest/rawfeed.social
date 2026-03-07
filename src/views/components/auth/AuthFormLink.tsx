
type AuthFormLinkProps = {
  label: string;
  href: string;
  linkText: string;
};

export function AuthFormLink({ label, href, linkText }: AuthFormLinkProps) {
  return (
    <div class="text-center text-sm">
      <span class="text-gray-600" safe>
        {label}
      </span>
      <a
        href={href}
        class="font-medium text-black hover:text-gray-700 ml-1 underline"
        safe
      >
        {linkText}
      </a>
    </div>
  );
}
