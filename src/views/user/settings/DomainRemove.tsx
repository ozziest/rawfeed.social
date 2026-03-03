/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../../types/views";
import type { Selectable } from "kysely";
import type { Users } from "../../../types/database";
import { DefaultLayout } from "../../layouts/DefaultLayout";

type DomainRemoveProps = BaseProps & {
  csrfToken: string;
  user: Selectable<Users>;
};

export function DomainRemove(props: DomainRemoveProps) {
  const { csrfToken, user, validation } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-2xl mx-auto px-4 py-8">
        <div class="mb-6">
          <a
            href="/user/settings/domain/verify"
            class="text-black hover:text-gray-700 font-medium underline text-sm mb-3 inline-block"
          >
            ← Back to Domain Verification
          </a>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            Remove Custom Domain
          </h1>
          <p class="text-gray-600">
            Permanently remove your custom domain configuration from your
            account.
          </p>
        </div>

        <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex items-start gap-3">
            <div class="shrink-0 text-red-500 mt-0.5">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-red-800 mb-1">
                Warning: This action is irreversible
              </h3>
              <ul class="text-sm text-red-700 space-y-1 list-disc list-inside">
                <li>Your custom domain will be immediately disconnected</li>
                <li>
                  Any visitors using your custom domain will no longer reach
                  your profile
                </li>
                <li>
                  You will need to re-add and re-verify the domain if you want
                  to use it again
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 class="font-semibold text-gray-900 mb-3">
            Current Configuration
          </h3>
          <dl class="space-y-2">
            <div class="flex gap-6">
              <dt class="text-sm text-gray-500 w-32 shrink-0">Domain</dt>
              <dd class="text-sm font-mono text-gray-900" safe>
                {user.custom_domain}
              </dd>
            </div>
            <div class="flex gap-6">
              <dt class="text-sm text-gray-500 w-32 shrink-0">Status</dt>
              <dd>
                {user.domain_verification_status === "verified" ? (
                  <span class="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    Verified
                  </span>
                ) : user.domain_verification_status === "pending" ? (
                  <span class="px-2 py-0.5 text-xs font-medium text-amber-700 bg-amber-100 rounded-full">
                    Pending
                  </span>
                ) : (
                  <span class="px-2 py-0.5 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                    Failed
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="font-semibold text-gray-900 mb-2">Confirm Removal</h3>
          <p class="text-sm text-gray-600 mb-4">
            Type your domain name{" "}
            <code class="font-mono bg-gray-100 px-1 rounded" safe>
              {user.custom_domain}
            </code>{" "}
            below to confirm removal.
          </p>

          <form method="POST" action="/user/settings/domain/remove">
            <input type="hidden" name="_csrf" value={csrfToken} />
            <div class="mb-4">
              <label
                for="domain"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Domain Name
              </label>
              <input
                type="text"
                id="domain"
                name="domain"
                class={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${validation?.domain ? "border-red-500" : "border-gray-300"}`}
                placeholder={user.custom_domain || ""}
                autocomplete="off"
              />
              <div safe>
                {validation?.domain && (
                  <p class="mt-1 text-sm text-red-600" safe>
                    {validation.domain}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              class="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Remove Domain
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
