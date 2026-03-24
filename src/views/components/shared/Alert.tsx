import type { Children } from "@kitajs/html";

export type AlertProps = {
  type?: "info" | "success" | "error";
  children: Children;
  className?: string;
};

const typeStyles = {
  info: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300",
  success:
    "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-300",
  error:
    "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-300",
};

export function Alert({ type = "info", children, className = "" }: AlertProps) {
  return (
    <div
      class={
        `border rounded-lg p-4 mb-4 flex items-start gap-3 ` +
        typeStyles[type] +
        (className ? ` ${className}` : "")
      }
      role="alert"
    >
      {children}
    </div>
  );
}
