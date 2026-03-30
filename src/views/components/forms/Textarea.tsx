type TextareaProps = {
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  rows?: number | string;
  maxlength?: number | string;
  class?: string;
};

export function Textarea({
  id,
  name,
  value = "",
  placeholder,
  rows = "3",
  maxlength,
  class:
    className = "w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none",
}: TextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      rows={String(rows)}
      maxlength={maxlength !== undefined ? String(maxlength) : undefined}
      class={className}
      safe
    >
      {value}
    </textarea>
  );
}
