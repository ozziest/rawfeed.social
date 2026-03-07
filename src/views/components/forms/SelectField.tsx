export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  id: string;
  name: string;
  options: SelectOption[];
  value?: string;
};

export function SelectField({ id, name, options, value }: SelectFieldProps) {
  return (
    <select
      id={id}
      name={name}
      class="text-sm text-gray-600 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-black"
    >
      {options.map(({ value: v, label }) => (
        <option value={v} selected={value === v || false}>
          {label}
        </option>
      ))}
    </select>
  );
}
