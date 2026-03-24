import { CheckCircleSmallIcon } from "../icons/CheckCircleSmallIcon";
import { ClockCircleSmallIcon } from "../icons/ClockCircleSmallIcon";
import { XCircleSmallIcon } from "../icons/XCircleSmallIcon";

type DomainStatusBadgeProps = {
  status: string | null | undefined;
  variant?: "icon" | "sm" | "md";
};

export function DomainStatusBadge({
  status,
  variant = "md",
}: DomainStatusBadgeProps) {
  if (variant === "icon") {
    if (status === "verified") {
      return (
        <span class="inline-flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400">
          <CheckCircleSmallIcon class="w-3 h-3" />
          Verified
        </span>
      );
    }
    if (status === "pending") {
      return (
        <span class="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400">
          <ClockCircleSmallIcon class="w-3 h-3" />
          Pending verification
        </span>
      );
    }
    if (status === "failed") {
      return (
        <span class="inline-flex items-center gap-1 text-xs font-medium text-red-700 dark:text-red-400">
          <XCircleSmallIcon class="w-3 h-3" />
          Verification failed
        </span>
      );
    }
    return <></>;
  }

  const size =
    variant === "sm"
      ? "px-2 py-0.5 text-xs font-medium rounded-full"
      : "px-3 py-1 text-sm font-medium rounded-full";

  if (status === "verified") {
    const label = variant === "md" ? "✓ Verified" : "Verified";
    return (
      <span
        class={
          size +
          " text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
        }
      >
        {label}
      </span>
    );
  }
  if (status === "pending") {
    const label = variant === "md" ? "Pending Verification" : "Pending";
    return (
      <span
        class={
          size +
          " text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30"
        }
      >
        {label}
      </span>
    );
  }
  const label = variant === "md" ? "Verification Failed" : "Failed";
  return (
    <span
      class={
        size + " text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
      }
    >
      {label}
    </span>
  );
}
