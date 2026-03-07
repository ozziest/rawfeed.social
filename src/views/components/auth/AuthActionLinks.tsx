
type AuthActionLinksProps = {
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

export function AuthActionLinks({ primary, secondary }: AuthActionLinksProps) {
  return (
    <div class="space-y-3">
      <a
        href={primary.href}
        class="group relative flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        safe
      >
        {primary.label}
      </a>
      <a
        href={secondary.href}
        class="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        safe
      >
        {secondary.label}
      </a>
    </div>
  );
}
