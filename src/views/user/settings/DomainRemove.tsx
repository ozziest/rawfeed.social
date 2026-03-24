import type { BaseProps } from "../../../types/views";
import type { Selectable } from "kysely";
import type { Users } from "../../../types/database";
import { CsrfToken } from "../../components/forms/CsrfToken";
import { FieldError } from "../../components/forms/FieldError";
import { Button } from "../../components/forms/Button";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { SettingsPageHeader } from "../../components/shared/SettingsPageHeader";
import { WarningNotice } from "../../components/shared/WarningNotice";
import { Card } from "../../components/shared/Card";
import { DomainStatusBadge } from "../../components/shared/DomainStatusBadge";

type DomainRemoveProps = BaseProps & {
  csrfToken: string;
  user: Selectable<Users>;
};

export function DomainRemove(props: DomainRemoveProps) {
  const { csrfToken, user, validation } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <SettingsPageHeader
          backHref="/user/settings/domain/verify"
          backLabel="Back to Domain Verification"
          title="Remove Custom Domain"
          description="Permanently remove your custom domain configuration from your account."
        />

        <WarningNotice
          title="Warning: This action is irreversible"
          class="mb-6"
        >
          <ul class="text-sm text-red-700 space-y-1 list-disc list-inside">
            <li>Your custom domain will be immediately disconnected</li>
            <li>
              Any visitors using your custom domain will no longer reach your
              profile
            </li>
            <li>
              You will need to re-add and re-verify the domain if you want to
              use it again
            </li>
          </ul>
        </WarningNotice>

        <Card class="mb-6">
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Current Configuration
          </h3>
          <dl class="space-y-2">
            <div class="flex gap-6">
              <dt class="text-sm text-gray-500 dark:text-gray-400 w-32 shrink-0">
                Domain
              </dt>
              <dd
                class="text-sm font-mono text-gray-900 dark:text-gray-100"
                safe
              >
                {user.custom_domain}
              </dd>
            </div>
            <div class="flex gap-6">
              <dt class="text-sm text-gray-500 dark:text-gray-400 w-32 shrink-0">
                Status
              </dt>
              <dd>
                <DomainStatusBadge
                  status={user.domain_verification_status}
                  variant="sm"
                />
              </dd>
            </div>
          </dl>
        </Card>

        <Card>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Confirm Removal
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Type your domain name{" "}
            <code
              class="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded"
              safe
            >
              {user.custom_domain}
            </code>{" "}
            below to confirm removal.
          </p>

          <form method="POST" action="/user/settings/domain/remove">
            <CsrfToken token={csrfToken} />
            <div class="mb-4">
              <label
                for="domain"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Domain Name
              </label>
              <input
                type="text"
                id="domain"
                name="domain"
                class={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent dark:bg-gray-700 dark:text-gray-100 ${validation?.domain ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                placeholder={user.custom_domain || ""}
                autocomplete="off"
              />
              <FieldError message={validation?.domain} />
            </div>
            <Button type="submit" variant="danger" class="px-6 py-3">
              Remove Domain
            </Button>
          </form>
        </Card>
      </div>
    </DefaultLayout>
  );
}
