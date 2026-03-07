import type { Children } from "@kitajs/html";
import { WarningTriangleSmallIcon } from "../icons/WarningTriangleSmallIcon";

type WarningNoticeProps = {
  title: string;
  class?: string;
  children: Children;
};

export function WarningNotice({
  title,
  class: extraClass = "",
  children,
}: WarningNoticeProps) {
  return (
    <div
      class={(
        "bg-red-50 border border-red-200 rounded-lg p-4 " + extraClass
      ).trim()}
    >
      <div class="flex items-start gap-3">
        <WarningTriangleSmallIcon class="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h3 class="font-semibold text-red-800 mb-1" safe>
            {title}
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
}
