import { CheckIcon } from "../icons/CheckIcon";

type AuthSuccessHeadingProps = {
  title: string;
  subtitle: string;
};

export function AuthSuccessHeading({
  title,
  subtitle,
}: AuthSuccessHeadingProps) {
  return (
    <div class="text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
        <CheckIcon class="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <h2
        class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
        safe
      >
        {title}
      </h2>
      <p class="mt-4 text-base text-gray-600 dark:text-gray-400" safe>
        {subtitle}
      </p>
    </div>
  );
}
