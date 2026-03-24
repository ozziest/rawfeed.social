import type { Children } from "@kitajs/html";
import { InfoCircleSmallIcon } from "../icons/InfoCircleSmallIcon";

type InfoNoticeProps = {
  title: string;
  class?: string;
  children: Children;
};

export function InfoNotice({
  title,
  class:
    className = "bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg p-4",
  children,
}: InfoNoticeProps) {
  return (
    <div class={className}>
      <div class="flex gap-3">
        <InfoCircleSmallIcon class="w-5 h-5 text-gray-900 dark:text-gray-100 shrink-0 mt-0.5" />
        <div class="text-sm text-gray-700 dark:text-gray-300">
          <p class="font-medium mb-1" safe>
            {title}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
