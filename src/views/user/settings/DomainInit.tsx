/** @jsxImportSource @kitajs/html */
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
        <div class="mb-6">
          <a
            href="/user/settings"
            class="text-black hover:text-gray-700 text-sm font-medium mb-3 inline-block underline"
          >
            ← Back to Settings
          </a>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Custom Domain</h1>
          <p class="text-gray-600">
            Connect your own domain name to your rawfeed.social profile. Your
            posts and profile will be accessible via your custom domain while
            maintaining full compatibility with the rawfeed.social network.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            Setup Custom Domain
          </h2>

          <form method="POST" action="/user/settings/domain">
            <input type="hidden" name="_csrf" value={csrfToken} />

            <div class="mb-6">
              <label
                for="domain"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Domain
              </label>
              <input
                type="text"
                id="domain"
                name="domain"
                placeholder="example.com"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
              <p class="mt-2 text-sm text-gray-500">
                Enter your domain without http:// or www (e.g., example.com)
              </p>
              <div>
                {validation?.domain ? (
                  <p class="text-red-700 text-sm my-1" safe>
                    {validation.domain}
                  </p>
                ) : undefined}
              </div>
            </div>

            <div class="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
              <div class="flex gap-3">
                <svg
                  class="w-5 h-5 text-black shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="text-sm text-gray-900">
                  <p class="font-medium mb-1">What you'll need:</p>
                  <ul class="list-disc list-inside space-y-1 text-gray-700">
                    <li>Access to your domain's DNS settings</li>
                    <li>Ability to add a TXT record</li>
                    <li>5-10 minutes for DNS propagation</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="w-full bg-black hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Continue
            </button>
          </form>
        </div>

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
