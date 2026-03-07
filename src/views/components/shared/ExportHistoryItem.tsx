import type { DataExports } from "../../../types/database";
import type { Selectable } from "kysely";
import { ExportStatusBadge } from "../shared/ExportStatusBadge";
import { DownloadIcon } from "../icons/DownloadIcon";

type ExportHistoryItemProps = {
  exp: Selectable<DataExports>;
};

export function ExportHistoryItem({ exp }: ExportHistoryItemProps) {
  const isExpired =
    exp.expires_at != null && new Date(exp.expires_at) <= new Date();

  const canDownload =
    exp.status === "completed" && exp.expires_at != null && !isExpired;

  const size = `Size: ${((exp.file_size as number) / 1024 / 1024).toFixed(2)} MB`;

  return (
    <div class="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <ExportStatusBadge status={exp.status || ""} />
        </div>
        <p class="text-xs text-gray-600">
          Requested:{" "}
          <span safe>
            {new Date(exp.requested_at as Date).toLocaleString()}
          </span>
        </p>
        {exp.status === "completed" && exp.expires_at != null ? (
          <p class="text-xs text-gray-600">
            {!isExpired ? (
              <>
                Expires:{" "}
                <span safe>{new Date(exp.expires_at).toLocaleString()}</span>
              </>
            ) : (
              <span class="text-red-600">Expired</span>
            )}
          </p>
        ) : undefined}
        {exp.file_size != null ? (
          <p class="text-xs text-gray-600" safe>
            {size}
          </p>
        ) : undefined}
      </div>
      <div>
        {canDownload ? (
          <a
            href={`/user/settings/data-extraction/${exp.id}/download`}
            class="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs font-medium rounded hover:bg-gray-800 transition-colors"
            target="_blank"
          >
            <DownloadIcon class="w-4 h-4" />
            Download
          </a>
        ) : exp.status === "completed" && isExpired ? (
          <span class="text-xs text-gray-500">Expired</span>
        ) : exp.status === "pending" || exp.status === "processing" ? (
          <span class="text-xs text-gray-500">Processing...</span>
        ) : null}
      </div>
    </div>
  );
}
