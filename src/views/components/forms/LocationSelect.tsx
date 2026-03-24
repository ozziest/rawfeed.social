import { SelectField, SelectOption } from "./SelectField";

const LOCATIONS: SelectOption[] = [
  { value: "en", label: "English" },
  { value: "da", label: "Danish" },
  { value: "tr", label: "Turkish" },
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
