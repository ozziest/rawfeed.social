/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../../types/views";
import type { DataExports } from "../../../types/database";
import type { Selectable } from "kysely";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { FlashMessages } from "../../partials/FlashMessages";

type DataExtractionProps = BaseProps & {
  csrfToken: string;
  exports: Selectable<DataExports>[];
  canRequest: boolean;
};

function ExportStatusBadge({ status }: { status: string }) {
  if (status === "completed") {
    return (
      <span class="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        Completed
      </span>
    );
  }
  if (status === "processing") {
    return (
      <span class="inline-flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-200 px-2 py-1 rounded border border-gray-300">
        <svg class="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Processing
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span class="inline-flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clip-rule="evenodd"
          />
        </svg>
        Pending
      </span>
    );
  }
  return (
    <span class="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded">
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
      Failed
    </span>
  );
}

export function DataExtraction(props: DataExtractionProps) {
  const { csrfToken, exports: exportList, canRequest, state } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <div class="mb-6">
          <a
            href="/user/settings"
            class="inline-flex items-center text-black hover:text-gray-700 mb-4 font-medium"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Settings
          </a>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Data Extraction</h1>
          <p class="text-gray-600">
            Request and download complete archives of your data
          </p>
        </div>

        <FlashMessages state={state} />

        <div class="space-y-4">
          {/* Request New Export */}
          <div class="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  Request Export
                </h3>
                <p class="text-sm text-gray-600 mt-1">
                  Generate a complete archive of your profile and posts
                </p>
              </div>
              <svg
                class="w-6 h-6 text-gray-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <form action="/user/settings/data-extraction/request" method="POST">
              <input type="hidden" name="_csrf" value={csrfToken} />
              {canRequest ? (
                <button
                  type="submit"
                  class="px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                >
                  Request New Export
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    disabled
                    class="px-4 py-2 bg-gray-300 text-gray-500 text-sm font-medium rounded cursor-not-allowed"
                  >
                    Already Requested (1 per week)
                  </button>
                  <p class="text-sm text-gray-600 mt-2">
                    You can request a new export once per week. Your next export
                    will be available after 7 days from your last request.
                  </p>
                </>
              )}
            </form>
          </div>

          <div safe>
            {exportList && exportList.length > 0 && (
              <div class="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                  Export History
                </h3>
                <div class="space-y-3">
                  {exportList.map((exp) => {
                    const isExpired =
                      exp.expires_at != null &&
                      new Date(exp.expires_at) <= new Date();

                    const canDownload =
                      exp.status === "completed" &&
                      exp.expires_at != null &&
                      !isExpired;

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
                              {new Date(
                                exp.requested_at as Date,
                              ).toLocaleString()}
                            </span>
                          </p>
                          {exp.status === "completed" &&
                            exp.expires_at != null && (
                              <p class="text-xs text-gray-600">
                                {!isExpired ? (
                                  <>
                                    Expires:{" "}
                                    <span safe>
                                      {new Date(
                                        exp.expires_at,
                                      ).toLocaleString()}
                                    </span>
                                  </>
                                ) : (
                                  <span class="text-red-600">Expired</span>
                                )}
                              </p>
                            )}
                          {exp.file_size != null && (
                            <p class="text-xs text-gray-600" safe>
                              {size}
                            </p>
                          )}
                        </div>
                        <div>
                          {canDownload ? (
                            <a
                              href={`/user/settings/data-extraction/${exp.id}/download`}
                              class="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs font-medium rounded hover:bg-gray-800 transition-colors"
                              target="_blank"
                            >
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Download
                            </a>
                          ) : exp.status === "completed" && isExpired ? (
                            <span class="text-xs text-gray-500">Expired</span>
                          ) : exp.status === "pending" ||
                            exp.status === "processing" ? (
                            <span class="text-xs text-gray-500">
                              Processing...
                            </span>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Info Notice */}
          <div class="bg-gray-100 border border-gray-300 rounded-lg p-4">
            <div class="flex gap-3">
              <svg
                class="w-5 h-5 text-black shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="text-sm text-gray-700">
                <p class="font-medium mb-1">About your data export</p>
                <ul class="space-y-1 list-disc list-inside">
                  <li>
                    Exports are ZIP archives containing your data in JSON format
                  </li>
                  <li>Extract the ZIP file to access your data</li>
                  <li>You can request one export per week</li>
                  <li>Download links expire after 24 hours for security</li>
                  <li>You'll receive an email when your export is ready</li>
                  <li>
                    Processing may take several minutes depending on data size
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
