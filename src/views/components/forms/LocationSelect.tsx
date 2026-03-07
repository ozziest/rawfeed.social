import { SelectField, SelectOption } from "./SelectField";

const LOCATIONS: SelectOption[] = [
  { value: "en", label: "English" },
  { value: "tr", label: "Turkish" },
  { value: "da", label: "Danish" },
];

type LocationSelectProps = {
  value?: string;
};

export function LocationSelect({ value }: LocationSelectProps) {
  return (
    <SelectField
      id="location"
      name="location"
      options={LOCATIONS}
      value={value}
    />
  );
}
