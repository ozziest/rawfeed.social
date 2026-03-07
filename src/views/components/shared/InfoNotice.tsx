import type { Children } from "@kitajs/html";
import { InfoCircleSmallIcon } from "../icons/InfoCircleSmallIcon";

type InfoNoticeProps = {
  title: string;
  class?: string;
  children: Children;
};

export function InfoNotice({
  title,
  class: className = "bg-gray-100 border border-gray-300 rounded-lg p-4",
  children,
}: InfoNoticeProps) {
  return (
    <div class={className}>
      <div class="flex gap-3">
        <InfoCircleSmallIcon class="w-5 h-5 text-black shrink-0 mt-0.5" />
        <div class="text-sm text-gray-700">
          <p class="font-medium mb-1" safe>
            {title}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
