import type { BaseProps } from "../../types/views";
import { DefaultLayout } from "../layouts/DefaultLayout";

type Props = BaseProps;

export function DPAPage(props: Props) {
  return (
    <DefaultLayout {...props} title="Data Processing Agreement - Rawfeed">
      <>
        <div class="max-w-4xl mx-auto px-6 py-12">
          <h1 class="text-4xl font-bold mb-2">
            Data Processing Agreement (DPA)
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Last Updated: 05 April 2026
          </p>

          <div class="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 class="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                This Data Processing Agreement (DPA) outlines how Rawfeed
                processes personal data on behalf of users and in partnership
                with third-party service providers (data processors). This
                document complies with the General Data Protection Regulation
                (GDPR), Articles 28-32.
              </p>
              <p class="mt-4">
                <strong>Data Controller:</strong> Ozgur Adem Isikli, Ingrid
                Marievej 28 Valby Denmark
              </p>
              <p class="mt-2">
                <strong>Service:</strong> Rawfeed (non-profit, open-source
                microblogging platform)
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                2. Data Processors & Processing Activities
              </h2>
              <p>
                The following third-party providers process personal data on
                behalf of Rawfeed. All processors are bound by GDPR-compliant
                Data Processing Agreements.
              </p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                2.1 Infrastructure & Hosting
              </h3>
              <div class="overflow-x-auto -mx-2 sm:mx-0">
                <table class="w-full mt-3 border-collapse border border-gray-300 min-w-[640px]">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Provider
                      </th>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Purpose
                      </th>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Location
                      </th>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        DPA
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <strong>DigitalOcean</strong>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Database (MySQL), Cache (Redis), Server hosting
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Frankfurt, Germany (FRA1)
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <a
                          href="https://www.digitalocean.com/legal/data-processing-agreement"
                          class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                        >
                          DigitalOcean DPA
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-gray-50 dark:bg-gray-800">
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <strong>AWS</strong>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Database backups & disaster recovery
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Frankfurt, Germany (EU-Central-1)
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <a
                          href="https://docs.aws.amazon.com/whitepapers/latest/navigating-gdpr-compliance/aws-data-processing-addendum-dpa.html"
                          class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                        >
                          AWS DPA
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <strong>Cloudflare</strong>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        CDN, DDoS protection, DNS
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Global (EU data centers)
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <a
                          href="https://www.cloudflare.com/trust-hub/dpa/"
                          class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                        >
                          Cloudflare DPA
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                2.2 Support & Monitoring Services
              </h3>
              <div class="overflow-x-auto -mx-2 sm:mx-0">
                <table class="w-full mt-3 border-collapse border border-gray-300 min-w-160">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Provider
                      </th>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Purpose
                      </th>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Data Type
                      </th>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        DPA
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <strong>Sentry</strong>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Error tracking & monitoring (optional)
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Anonymized error logs, stack traces (NO PII)
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <a
                          href="https://sentry.io/legal/dpa/"
                          class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                        >
                          Sentry DPA
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-gray-50 dark:bg-gray-800">
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <strong>AWS SES</strong>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Email service for account notifications
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Email address, notification content
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <a
                          href="https://docs.aws.amazon.com/whitepapers/latest/navigating-gdpr-compliance/aws-data-processing-addendum-dpa.html"
                          class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                        >
                          AWS DPA
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <strong>Gravatar</strong>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Avatar/profile picture service (if used)
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Email hash (for gravatar lookup)
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <a
                          href="https://automattic.com/privacy/"
                          class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                        >
                          Automattic Privacy
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                3. Categories of Personal Data
              </h2>
              <p>The following categories of personal data are processed:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Identity Data:</strong> Name, username, email address,
                  password (hashed)
                </li>
                <li>
                  <strong>Profile Data:</strong> Bio, profile picture, custom
                  domain, domain verification status, RSS feed URLs submitted by
                  the user
                </li>
                <li>
                  <strong>Content Data:</strong> Posts, replies, shares, likes,
                  hashtags, mentions
                </li>
                <li>
                  <strong>Engagement Data:</strong> View counts, reply counts,
                  like counts, share counts
                </li>
                <li>
                  <strong>Technical Data:</strong> IP addresses (logs), browser
                  user agents, request timestamps, access logs
                </li>
                <li>
                  <strong>Cookies:</strong> Session tokens (JWT), CSRF tokens,
                  flash messages
                </li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                4. Purpose of Data Processing
              </h2>
              <p>Personal data is processed for the following purposes:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Delivery:</strong> Providing the Rawfeed
                  microblogging platform
                </li>
                <li>
                  <strong>RSS Feed Syndication:</strong> Fetching and displaying
                  content from RSS feed URLs submitted by users
                </li>
                <li>
                  <strong>Authentication & Security:</strong> User login,
                  session management, fraud detection, abuse prevention
                </li>
                <li>
                  <strong>Communication:</strong> Account notifications,
                  password resets
                </li>
                <li>
                  <strong>Performance & Monitoring:</strong> Platform
                  optimization, error tracking, analytics (anonymized)
                </li>
                <li>
                  <strong>Legal Compliance:</strong> Responding to legal
                  requests, maintaining audit logs
                </li>
                <li>
                  <strong>Backup & Disaster Recovery:</strong> Data protection
                  against loss or corruption
                </li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">5. Data Subject Rights</h2>
              <p>
                As part of this DPA, data subjects (users) have the following
                rights, which Rawfeed facilitates:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Right to Access:</strong> Users can request a copy of
                  their data
                </li>
                <li>
                  <strong>Right to Rectification:</strong> Users can edit their
                  profile information
                </li>
                <li>
                  <strong>Right to Erasure:</strong> Users can delete their
                  account and data
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Users can export
                  their data or access via RSS feed
                </li>
                <li>
                  <strong>Right to Object:</strong> Users can opt-out of certain
                  processing
                </li>
              </ul>
              <p class="mt-4">
                For requests related to these rights, see our
                <a
                  href="/legal/data-rights"
                  class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                >
                  Data Subject Rights Instructions
                </a>
                .
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">6. Data Security Measures</h2>
              <p>
                The following technical and organizational measures are
                implemented:
              </p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                6.1 Technical Measures
              </h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Encryption:</strong> HTTPS/TLS for data in transit,
                  HTTPS enforced in production
                </li>
                <li>
                  <strong>Password Security:</strong> Bcrypt hashing with
                  automatic salt rounds
                </li>
                <li>
                  <strong>Session Management:</strong> Short-lived JWT tokens
                  (10-minute expiration), secure httpOnly cookies
                </li>
                <li>
                  <strong>Input Validation:</strong> All user input sanitized;
                  HTML tags stripped; injection attacks prevented
                </li>
                <li>
                  <strong>CSRF Protection:</strong> Anti-CSRF tokens on all
                  state-changing operations
                </li>
                <li>
                  <strong>DDoS Mitigation:</strong> Cloudflare DDoS protection
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                6.2 Organizational Measures
              </h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Access Control:</strong> Data access restricted to
                  authorized personnel (developer)
                </li>
                <li>
                  <strong>Rate Limiting:</strong> API rate limits (400 requests
                  per 15 minutes globally; tighter limits on auth endpoints)
                </li>
                <li>
                  <strong>Backup & Recovery:</strong> 30-day backup retention
                  for disaster recovery
                </li>
                <li>
                  <strong>Data Retention Policy:</strong> Deleted data purged
                  after 30-day backup period; logs retained up to 90 days
                </li>
                <li>
                  <strong>Incident Response:</strong> Security vulnerabilities
                  handled responsibly; users notified of breaches
                </li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                7. Data Retention Schedule
              </h2>

              <div class="overflow-x-auto -mx-2 sm:mx-0">
                <table class="w-full mt-4 border-collapse border border-gray-300 min-w-[640px]">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Data Type
                      </th>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Retention Period
                      </th>
                      <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <strong>User Account Data</strong>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        30 days after deletion (backup)
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Permanent deletion window + recovery
                      </td>
                    </tr>
                    <tr class="bg-gray-50 dark:bg-gray-800">
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <strong>Posts & Content</strong>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        30 days after deletion (backup)
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Permanent deletion window + recovery
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <strong>Access Logs</strong>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Up to 90 days
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Security, debugging, legal compliance
                      </td>
                    </tr>
                    <tr class="bg-gray-50 dark:bg-gray-800">
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <strong>Error Logs</strong>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Up to 90 days
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Platform monitoring (anonymized)
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        <strong>Session Tokens</strong>
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        10 minutes (access token), 30 days (refresh token)
                      </td>
                      <td class="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        Active session management
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                8. Sub-processors & Changes
              </h2>
              <p>
                Rawfeed uses the processors listed in Section 2 above. If
                sub-processors change or new processors are added, users will be
                notified via:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Email notification to registered users</li>
                <li>Updated DPA published on this page</li>
                <li>At least 30 days advance notice</li>
              </ul>
              <p class="mt-4">
                Users can lodge objections to new sub-processors by contacting
                <a
                  href="mailto:i.ozguradem@gmail.com"
                  class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                >
                  i.ozguradem@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                9. International Data Transfers
              </h2>
              <p>
                All personal data is stored and processed within the EU/EEA. No
                data is transferred outside the EU/EEA. This ensures full GDPR
                compliance regarding data localization.
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Primary Infrastructure:</strong> DigitalOcean
                  (Frankfurt, Germany)
                </li>
                <li>
                  <strong>Backup Infrastructure:</strong> AWS (Frankfurt,
                  Germany, EU-Central-1)
                </li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">10. Audit & Compliance</h2>
              <p>
                Rawfeed implements practices to ensure ongoing GDPR compliance:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Regular security audits and updates</li>
                <li>Monitoring of processor compliance</li>
                <li>
                  Prompt response to data subject rights requests (30 days)
                </li>
                <li>Incident response procedures for data breaches</li>
                <li>Documentation of processing activities</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                11. Definitions (GDPR References)
              </h2>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Data Controller:</strong> The entity (Ozgur Adem
                  Isikli) determining the purposes and means of processing (GDPR
                  Article 4(7))
                </li>
                <li>
                  <strong>Data Processor:</strong> Entity processing data on
                  behalf of the controller (DigitalOcean, AWS, Cloudflare, etc.)
                  (GDPR Article 4(8))
                </li>
                <li>
                  <strong>Data Subject:</strong> The individual whose data is
                  processed (Rawfeed users) (GDPR Article 4(1))
                </li>
                <li>
                  <strong>Personal Data:</strong> Information relating to an
                  identified or identifiable person (GDPR Article 4(1))
                </li>
                <li>
                  <strong>Processing:</strong> Any operation performed on data
                  (collection, storage, use, deletion, etc.) (GDPR Article 4(2))
                </li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">12. Questions or Concerns</h2>
              <p>
                If you have questions about this DPA or how your data is
                processed, please contact:
              </p>
              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded mt-4">
                <p>
                  <strong>Data Controller (Ozgur Adem Isikli):</strong>
                </p>
                <p>
                  Email:
                  <a
                    href="mailto:i.ozguradem@gmail.com"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    i.ozguradem@gmail.com
                  </a>
                </p>
                <p class="mt-2 text-sm">
                  <strong>Response Time:</strong> 30 days for substantive
                  requests
                </p>
              </div>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">13. Related Documents</h2>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <a
                    href="/legal/privacy"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/legal/terms"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/legal/data-rights"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    Data Subject Rights Instructions
                  </a>
                </li>
                <li>
                  <a
                    href="/legal/cookies"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
}
