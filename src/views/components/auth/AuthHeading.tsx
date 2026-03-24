type AuthHeadingProps = {
  title: string;
  subtitle: string;
};

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <div class="text-center">
      <h2
        class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
        safe
      >
        {title}
      </h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400" safe>
        {subtitle}
      </p>
    </div>
  );
}
