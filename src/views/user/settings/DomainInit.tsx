import { CsrfToken } from "../../components/forms/CsrfToken";
import { SettingsPageHeader } from "../../components/shared/SettingsPageHeader";
import { Card } from "../../components/shared/Card";
import { FieldError } from "../../components/forms/FieldError";
import { InfoNotice } from "../../components/shared/InfoNotice";
import { Button } from "../../components/forms/Button";
import type { BaseProps } from "../../../types/views";
import type { TokenPayload } from "../../../helpers/tokens";
import { DefaultLayout } from "../../layouts/DefaultLayout";

type DomainInitProps = BaseProps & {
  csrfToken: string;
  user?: TokenPayload;
};

export function DomainInit(props: DomainInitProps) {
  const { csrfToken, validation } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <SettingsPageHeader
          backHref="/user/settings"
          backLabel="Back to Settings"
          title="Custom Domain"
          description="Connect your own domain name to your rawfeed.social profile. Your posts and profile will be accessible via your custom domain while maintaining full compatibility with the rawfeed.social network."
        />

        <Card>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Setup Custom Domain
          </h2>

          <form method="POST" action="/user/settings/domain">
            <CsrfToken token={csrfToken} />

            <div class="mb-6">
              <label
                for="domain"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Your Domain
              </label>
              <input
                type="text"
                id="domain"
                name="domain"
                placeholder="example.com"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Enter your domain without http:// or www (e.g., example.com)
              </p>
              <FieldError message={validation?.domain} />
            </div>

            <InfoNotice
              title="What you'll need:"
              class="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6"
            >
              <ul class="list-disc list-inside space-y-1 text-gray-700">
                <li>Access to your domain's DNS settings</li>
                <li>Ability to add a TXT record</li>
                <li>5-10 minutes for DNS propagation</li>
              </ul>
            </InfoNotice>

            <Button type="submit" variant="primary" class="w-full px-6 py-3">
              Continue
            </Button>
          </form>
        </Card>

        <div class="mt-6 bg-gray-50 rounded-lg p-6">
          <h3 class="font-semibold text-gray-900 mb-3">How it works</h3>
          <div class="space-y-3 text-sm text-gray-700">
            {[
              "Enter your domain name",
              "Add a DNS TXT record to verify ownership",
              "Point your domain to rawfeed.social using CNAME",
              "Your profile will be accessible at your custom domain",
            ].map((step, i) => (
              <div class="flex gap-3">
                <span
                  class="shrink-0 w-6 h-6 bg-gray-200 text-black border border-gray-300 rounded-full flex items-center justify-center font-semibold text-xs"
                  safe
                >
                  {String(i + 1)}
                </span>
                <p safe>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
