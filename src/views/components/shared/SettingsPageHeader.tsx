import { ChevronLeftIcon } from "../icons/ChevronLeftIcon";

type SettingsPageHeaderProps = {
  backHref: string;
  backLabel: string;
  title: string;
  description: string;
};

export function SettingsPageHeader({
  backHref,
  backLabel,
  title,
  description,
}: SettingsPageHeaderProps) {
  return (
    <div class="mb-6">
      <a
        href={backHref}
        class="inline-flex items-center text-black hover:text-gray-700 mb-4 text-sm font-medium"
      >
        <ChevronLeftIcon class="w-4 h-4 mr-1" />
        <span safe>{backLabel}</span>
      </a>
      <h1 class="text-2xl font-bold text-gray-900 mb-2" safe>
        {title}
      </h1>
      <p class="text-gray-600" safe>
        {description}
      </p>
    </div>
  );
}
