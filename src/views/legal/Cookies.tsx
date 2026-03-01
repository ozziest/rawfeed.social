/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../types/views";
import { DefaultLayout } from "../layouts/DefaultLayout";

type Props = BaseProps;

export function CookiesPage(props: Props) {
  return (
    <DefaultLayout {...props} title="Cookie Policy - Rawfeed">
      <>
        <div class="max-w-4xl mx-auto px-6 py-12">
          <h1 class="text-4xl font-bold mb-2">Cookie Policy</h1>
          <p class="text-gray-600 mb-8">Last Updated: February 2026</p>

          <div class="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 class="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device that websites
                can access to remember information about you. Rawfeed uses
                cookies to provide authentication, security, and basic
                functionality—but we do NOT use tracking, analytics, or
                advertising cookies.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">2. Cookies We Use</h2>

              <h3 class="text-lg font-semibold mb-3">
                2.1 Essential / Functional Cookies
              </h3>
              <p>
                These cookies are necessary for the platform to work and do not
                require your consent under GDPR.
              </p>

              <div class="overflow-x-auto -mx-2 sm:mx-0">
                <table class="w-full mt-4 border-collapse border border-gray-300 min-w-[640px]">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Cookie Name
                      </th>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Purpose
                      </th>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Expiration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <code>accessToken</code>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Maintains your login session and authenticates your
                        requests
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        10 minutes
                      </td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <code>refreshToken</code>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Allows you to stay logged in without re-entering
                        credentials
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        30 days
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <code>_csrf</code>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Prevents cross-site request forgery attacks on forms you
                        submit
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Session
                      </td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <code>validation</code>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Displays form validation errors
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        1 hour
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <code>state</code>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Stores application state messages
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        1 hour
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p class="mt-4 text-sm">
                All Rawfeed cookies are set with the <code>httpOnly</code> and
                <code>Secure</code> flags, meaning they cannot be accessed by
                JavaScript and are only sent over HTTPS. This protects your
                session from theft or hijacking.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">3. Third-Party Cookies</h2>
              <p>
                The following third-party services may set cookies on your
                device when you use Rawfeed:
              </p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                3.1 Gravatar (Avatar Service)
              </h3>
              <p>
                If you use Gravatar for your profile avatar, Gravatar may set
                cookies to recognize you across websites.
                <a
                  href="https://automattic.com/privacy/"
                  class="text-black hover:underline font-medium"
                >
                  Learn about Gravatar's privacy
                </a>
                .
              </p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                3.2 Cloudflare (CDN & DDoS Protection)
              </h3>
              <p>
                Cloudflare provides our content delivery and DDoS protection.
                Cloudflare may set the <code>__cfruid</code> cookie and similar
                tracking identifiers.
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  class="text-black hover:underline font-medium"
                >
                  Learn about Cloudflare's cookies
                </a>
                .
              </p>

              <p class="mt-4">
                We recommend reviewing the privacy policies of these services
                for more details about their cookie practices.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">4. Cookies We Do NOT Use</h2>
              <p>Rawfeed does NOT use:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Analytics Cookies:</strong> Google Analytics,
                  Mixpanel, Amplitude, or similar tracking
                </li>
                <li>
                  <strong>Advertising Cookies:</strong> Facebook Pixel, Google
                  Ads, or behavioral targeting
                </li>
                <li>
                  <strong>Tracking Pixels:</strong> No invisible tracking or
                  fingerprinting
                </li>
                <li>
                  <strong>User Profiling:</strong> No cookies that build a
                  profile of your interests or behavior
                </li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">5. Managing Cookies</h2>

              <h3 class="text-lg font-semibold mb-3">5.1 Browser Controls</h3>
              <p>
                You can control or delete cookies through your browser settings:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <a
                    href="https://support.google.com/accounts/answer/61416"
                    class="text-black hover:underline font-medium"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                    class="text-black hover:underline font-medium"
                  >
                    Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/en-us/HT201265"
                    class="text-black hover:underline font-medium"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge"
                    class="text-black hover:underline font-medium"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                5.2 Important Note on Session Cookies
              </h3>
              <p>
                If you disable or delete functional cookies (session, CSRF,
                flash), you will be logged out and may experience issues with
                forms and authentication. We recommend allowing functional
                cookies while blocking third-party tracking cookies.
              </p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                5.3 Do Not Track (DNT)
              </h3>
              <p>
                Rawfeed respects the DNT header in your browser. Since we don't
                use tracking cookies, DNT doesn't change our behavior, but we
                honor your privacy preference.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">6. GDPR & Cookie Consent</h2>
              <p>
                Under GDPR, strictly necessary cookies (like authentication
                tokens) do NOT require your consent. However, we believe in
                transparency:
              </p>

              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Essential cookies (ours):</strong> No consent
                  required, but we inform you here
                </li>
                <li>
                  <strong>Third-party cookies (Gravatar, Cloudflare):</strong>{" "}
                  You may want to review their privacy policies
                </li>
                <li>
                  <strong>Analytics/tracking cookies:</strong> We don't use any,
                  so no consent banners needed
                </li>
              </ul>

              <p class="mt-4">
                If we ever introduce optional cookies or tracking features, we
                will ask for explicit consent via a clear, compliant consent
                banner.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                7. Privacy & Cookie Policy Relationship
              </h2>
              <p>
                For more information about how we use data collected through
                cookies and other methods, see our
                <a
                  href="/legal/privacy"
                  class="text-black hover:underline font-medium"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                8. Changes to This Cookie Policy
              </h2>
              <p>
                We may update this policy as our technology and services evolve.
                We will notify you of material changes via the "Last Updated"
                date above.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">9. Contact Us</h2>
              <p>
                If you have questions about our cookie practices, please contact
                us:
              </p>
              <div class="bg-gray-100 p-4 rounded mt-4">
                <p>
                  <strong>Rawfeed Support:</strong>
                </p>
                <p>
                  Email:
                  <a
                    href="mailto:i.ozguradem@gmail.com"
                    class="text-black hover:underline font-medium"
                  >
                    i.ozguradem@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
}
