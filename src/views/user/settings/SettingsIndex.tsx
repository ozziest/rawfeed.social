import type { BaseProps } from "../../../types/views";
import type { Selectable } from "kysely";
import type { Users } from "../../../types/database";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { FlashMessages } from "../../partials/FlashMessages";
import { SettingsNavItem } from "../../components/shared/SettingsNavItem";
import { DomainStatusBadge } from "../../components/shared/DomainStatusBadge";

type SettingsIndexProps = BaseProps & {
  user: Selectable<Users> | undefined;
};

export function SettingsIndex(props: SettingsIndexProps) {
  const { user } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <FlashMessages state={props.state} />
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Settings
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Manage your account preferences and settings
          </p>
        </div>

        <div class="space-y-3">
          <SettingsNavItem href="/user/settings/profile" title="Update profile">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Edit your name, bio, and other profile information.
            </p>
          </SettingsNavItem>

          <SettingsNavItem href="/user/settings/domain" title="Custom domain">
            {user?.custom_domain ? (
              <>
                <p
                  class="text-sm font-medium text-black dark:text-gray-200 mb-1"
                  safe
                >
                  {user.custom_domain}
                </p>
                <DomainStatusBadge
                  status={user.domain_verification_status}
                  variant="icon"
                />
              </>
            ) : (
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Use your own domain name for your profile and posts.
              </p>
            )}
          </SettingsNavItem>

          <SettingsNavItem
            href="/user/settings/data-extraction"
            title="Data extraction"
          >
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Export your account data and content in machine-readable formats.
            </p>
          </SettingsNavItem>
        </div>
      </div>
    </DefaultLayout>
  );
}
