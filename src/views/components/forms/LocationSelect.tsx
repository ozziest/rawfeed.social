const LOCATIONS = [
  { value: "en", label: "English" },
  { value: "tr", label: "Turkish" },
  { value: "da", label: "Danish" },
] as const;

type LocationSelectProps = {
  value?: string;
};

export function LocationSelect({ value }: LocationSelectProps) {
  return (
    <select
      id="location"
      name="location"
      class="text-sm text-gray-600 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-black"
    >
      {LOCATIONS.map(({ value: v, label }) => (
        <option
          value={v}
          selected={value === v || (!value && v === "en") ? true : undefined}
        >
          {label}
        </option>
      ))}
    </select>
  );
}
