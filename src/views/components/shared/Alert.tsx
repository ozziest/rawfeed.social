import type { Children } from "@kitajs/html";

export type AlertProps = {
  type?: "info" | "success" | "error";
  children: Children;
  className?: string;
};

const typeStyles = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
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
