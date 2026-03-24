import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";
import { MonitorIcon } from "../icons/MonitorIcon";

type ThemeToggleProps = {
  theme: "dark" | "light" | "system";
};

export function ThemeToggle({ theme }: ThemeToggleProps) {
  return (
    <button
      data-theme-toggle
      onclick="cycleTheme()"
      data-theme={theme}
      class="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      aria-label="Toggle theme"
    >
      <span data-role="sun">
        <SunIcon class="w-5 h-5" />
      </span>
      <span data-role="moon">
        <MoonIcon class="w-5 h-5" />
      </span>
      <span data-role="monitor">
        <MonitorIcon class="w-5 h-5" />
      </span>
    </button>
  );
}
