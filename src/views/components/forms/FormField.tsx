import type { Children } from "@kitajs/html";
import { FieldError } from "./FieldError";

export type FormFieldProps = {
  id: string;
  name: string;
  type?: string;
  label: string;
  value?: string | undefined;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  className?: string;
  inputClassName?: string;
  children?: Children;
};

export function FormField({
  id,
  name,
  type = "text",
  label,
  value,
  placeholder,
  autoComplete,
  required = false,
  error,
  className = "",
  inputClassName = "",
  children,
}: FormFieldProps) {
  return (
    <div class={className}>
      <label for={id} class="block text-sm font-medium text-gray-700" safe>
        {label}
      </label>
      <div class="mt-1">
        <input
          id={id}
          name={name}
          type={type}
          autocomplete={autoComplete}
          required={required}
          class={
            "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm " +
            inputClassName
          }
          placeholder={placeholder}
          value={value}
        />
        {children}
      </div>
      {error ? <FieldError message={error} /> : null}
    </div>
  );
}
