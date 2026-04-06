import type { BaseProps } from "../../../types/views";
import type { Selectable } from "kysely";
import type { Users } from "../../../types/database";
import { CsrfToken } from "../../components/forms/CsrfToken";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { FieldError } from "../../components/forms/FieldError";
import { Button } from "../../components/forms/Button";
import { SettingsPageHeader } from "../../components/shared/SettingsPageHeader";
import { Card } from "../../components/shared/Card";

type SettingsNotificationsProps = BaseProps & {
  user: Selectable<Users> | undefined;
  csrfToken: string;
};

const FREQ_OPTIONS: { value: string; label: string; description: string }[] = [
  {
    value: "off",
    label: "Off",
    description: "Do not send any email notifications",
  },
  {
    value: "hourly",
    label: "Hourly",
    description: "Receive a digest of new notifications every hour",
  },
  {
    value: "daily",
    label: "Daily",
    description: "Receive one digest email per day (recommended)",
  },
  {
    value: "weekly",
    label: "Weekly",
    description: "Receive one digest email per week",
  },
];

export function SettingsNotifications(props: SettingsNotificationsProps) {
  const { user, csrfToken, validation } = props;
  const currentFreq = (user as any)?.notif_email_freq ?? "daily";

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <SettingsPageHeader
          backHref="/user/settings"
          backLabel="Back to settings"
          title="Notification preferences"
          description="Choose how often you receive email summaries of your notifications"
        />

        <Card class="border border-gray-200">
          <form
            method="POST"
            action="/user/settings/notifications"
            class="space-y-6"
          >
            <CsrfToken token={csrfToken} />

            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
                Email digest frequency
              </p>
              <div class="space-y-3">
                {FREQ_OPTIONS.map((opt) => (
                  <label class="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="notif_email_freq"
                      value={opt.value}
                      checked={currentFreq === opt.value}
                      class="mt-0.5 h-4 w-4 border-gray-300 text-black focus:ring-black"
                    />
                    <div>
                      <span
                        class="block text-sm font-medium text-gray-900 dark:text-gray-100"
                        safe
                      >
                        {opt.label}
                      </span>
                      <span
                        class="block text-sm text-gray-500 dark:text-gray-400"
                        safe
                      >
                        {opt.description}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              <FieldError message={validation?.notif_email_freq} />
            </div>

            <div class="flex gap-3">
              <Button type="submit" variant="primary" class="px-6 py-2">
                Save changes
              </Button>
              <a
                href="/user/settings"
                class="px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Cancel
              </a>
            </div>
          </form>
        </Card>
      </div>
    </DefaultLayout>
  );
}
