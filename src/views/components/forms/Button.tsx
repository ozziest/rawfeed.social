import type { Children } from "@kitajs/html";

const VARIANT_CLASSES = {
  auth: "group relative flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
  primary:
    "bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
  danger:
    "bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
  ghost: "font-medium underline text-sm",
} as const;

export type ButtonVariant = keyof typeof VARIANT_CLASSES;

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  class?: string;
  /** @deprecated use class */
  className?: string;
  children: Children;
  disabled?: boolean;
};

export function Button({
  type = "button",
  variant = "auth",
  class: className = "",
  className: legacyClassName = "",
  children,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      class={[VARIANT_CLASSES[variant], className || legacyClassName]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
