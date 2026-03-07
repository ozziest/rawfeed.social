import type { BaseProps } from "../../../types/views";
import type { DataExports } from "../../../types/database";
import type { Selectable } from "kysely";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { FlashMessages } from "../../partials/FlashMessages";
import { SettingsPageHeader } from "../../components/shared/SettingsPageHeader";
import { ExportHistory } from "../../components/shared/ExportHistory";
import { InfoNotice } from "../../components/shared/InfoNotice";
import { RequestExport } from "../../components/shared/RequestExport";

type DataExtractionProps = BaseProps & {
  csrfToken: string;
  exports: Selectable<DataExports>[];
  canRequest: boolean;
};

export function DataExtraction(props: DataExtractionProps) {
  const { csrfToken, exports: exportList, canRequest, state } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <SettingsPageHeader
          backHref="/user/settings"
          backLabel="Back to Settings"
          title="Data Extraction"
          description="Request and download complete archives of your data"
        />

        <FlashMessages state={state} />

        <div class="space-y-4">
          <RequestExport csrfToken={csrfToken} canRequest={canRequest} />

          <ExportHistory exports={exportList} />

          <InfoNotice title="About your data export">
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
          </InfoNotice>
        </div>
      </div>
    </DefaultLayout>
  );
}
