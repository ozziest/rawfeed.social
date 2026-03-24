import type { BaseProps } from "../../../types/views";
import type { Selectable } from "kysely";
import type { Users } from "../../../types/database";
import { CsrfToken } from "../../components/forms/CsrfToken";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { Textarea } from "../../components/forms/Textarea";
import { FieldError } from "../../components/forms/FieldError";
import { Button } from "../../components/forms/Button";
import { SettingsPageHeader } from "../../components/shared/SettingsPageHeader";
import { Card } from "../../components/shared/Card";

type SettingsProfileProps = BaseProps & {
  user: Selectable<Users> | undefined;
  csrfToken: string;
};

export function SettingsProfile(props: SettingsProfileProps) {
  const { user, csrfToken, validation } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <SettingsPageHeader
          backHref="/user/settings"
          backLabel="Back to settings"
          title="Update profile"
          description="Edit your name, bio, and other profile information"
        />

        <Card class="border border-gray-200">
          <form method="POST" action="/user/settings/profile" class="space-y-6">
            <CsrfToken token={csrfToken} />

            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Display name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user?.name || ""}
                placeholder="Your name"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
              <FieldError message={validation?.name} />
            </div>

            <div>
              <label
                for="bio"
                class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Bio
              </label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Write something about yourself"
                rows={7}
                maxlength={400}
                value={user?.bio || ""}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
              />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Maximum 400 characters
              </p>
              <FieldError message={validation?.bio} />
            </div>

            <div>
              <label
                for="link"
                class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Website / Link
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={user?.link || ""}
                placeholder="https://yourwebsite.com"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Must start with http:// or https://
              </p>
              <FieldError message={validation?.link} />
            </div>

            <div class="flex gap-3">
              <Button type="submit" variant="primary" class="px-6 py-2">
                Save changes
              </Button>
              <a
                href="/user/settings"
                class="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
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
