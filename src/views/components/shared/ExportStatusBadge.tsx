import { CheckCircleSmallIcon } from "../icons/CheckCircleSmallIcon";
import { SpinnerIcon } from "../icons/SpinnerIcon";
import { ClockCircleSmallIcon } from "../icons/ClockCircleSmallIcon";
import { XCircleSmallIcon } from "../icons/XCircleSmallIcon";

type ExportStatusBadgeProps = { status: string };

export function ExportStatusBadge({ status }: ExportStatusBadgeProps) {
  if (status === "completed") {
    return (
      <span class="inline-flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
        <CheckCircleSmallIcon class="w-3 h-3" />
        Completed
      </span>
    );
  }
  if (status === "processing") {
    return (
      <span class="inline-flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded border border-gray-300 dark:border-gray-600">
        <SpinnerIcon class="w-3 h-3 animate-spin" />
        Processing
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span class="inline-flex items-center gap-1 text-xs font-medium text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
        <ClockCircleSmallIcon class="w-3 h-3" />
        Pending
      </span>
    );
  }
  return (
    <span class="inline-flex items-center gap-1 text-xs font-medium text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
      <XCircleSmallIcon class="w-3 h-3" />
      Failed
    </span>
  );
}
