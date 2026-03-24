import type { DataExports } from "../../../types/database";
import type { Selectable } from "kysely";
import { ExportHistoryItem } from "./ExportHistoryItem";

type ExportHistoryProps = {
  exports: Selectable<DataExports>[];
};

export function ExportHistory({ exports }: ExportHistoryProps) {
  if (!exports || exports.length === 0) return "";

  return (
    <div class="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Export History
      </h3>
      <div class="space-y-3">
        {exports.map((exp) => (
          <ExportHistoryItem exp={exp} />
        ))}
      </div>
    </div>
  );
}
