import { CsrfToken } from "../forms/CsrfToken";
import { ArchiveIcon } from "../icons/ArchiveIcon";
import { Button } from "../forms/Button";

type RequestExportProps = {
  csrfToken: string;
  canRequest: boolean;
};

export function RequestExport({ csrfToken, canRequest }: RequestExportProps) {
  return (
    <div class="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Request Export
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Generate a complete archive of your profile and posts
          </p>
        </div>
        <ArchiveIcon class="w-6 h-6 text-gray-400 dark:text-gray-500 shrink-0" />
      </div>
      <form action="/user/settings/data-extraction/request" method="POST">
        <CsrfToken token={csrfToken} />
        {canRequest ? (
          <Button type="submit" variant="primary" class="px-4 py-2 text-sm">
            Request New Export
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variant="primary"
              class="px-4 py-2 text-sm opacity-50 cursor-not-allowed"
              disabled
            >
              Already Requested (1 per week)
            </Button>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              You can request a new export once per week. Your next export will
              be available after 7 days from your last request.
            </p>
          </>
        )}
      </form>
    </div>
  );
}
