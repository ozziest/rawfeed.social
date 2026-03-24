import type { BaseProps } from "../../types/views";
import { DefaultLayout } from "../layouts/DefaultLayout";

type Props = BaseProps;

export function TermsPage(props: Props) {
  return (
    <DefaultLayout {...props} title="Terms of Service - Rawfeed">
      <>
        <div class="max-w-4xl mx-auto px-6 py-12">
          <h1 class="text-4xl font-bold mb-2">Terms of Service</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Last Updated: February 2026
          </p>

          <div class="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 class="text-2xl font-bold mb-4">1. Agreement & Acceptance</h2>
              <p>
                By accessing, registering, or using Rawfeed (the "Service"), you
                agree to be bound by these Terms of Service ("Terms"). If you do
                not agree to all of these Terms, you may not use the Service. We
                reserve the right to modify these Terms at any time. Your
                continued use of Rawfeed after such changes constitutes
                acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">2. Service Description</h2>
              <p>
                Rawfeed is a non-profit, open-source microblogging platform that
                prioritizes user sovereignty and algorithmic fairness. Key
                characteristics:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Chronological Feed:</strong> Posts appear in
                  chronological order. There are no algorithms, recommendations,
                  or engagement-maximizing feeds.
                </li>
                <li>
                  <strong>Text-Based Communication:</strong> Posts are limited
                  to 400 characters of text content.
                </li>
                <li>
                  <strong>Decentralized Control:</strong> Users own their data
                  and can export or delete it at any time.
                </li>
                <li>
                  <strong>RSS-Native:</strong> Every user profile has an RSS
                  feed for portable content distribution.
                </li>
                <li>
                  <strong>Bot Accounts:</strong> Rawfeed auto-creates
                  clearly-labeled bot accounts that syndicate RSS feeds from
                  external sources. See our
                  <a
                    href="/legal/bots"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    Bot Account Disclosure
                  </a>{" "}
                  for details.
                </li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                3. User Eligibility & Accounts
              </h2>

              <h3 class="text-lg font-semibold mb-3">3.1 Eligibility</h3>
              <p>
                You must be at least 16 years old (or the legal age of digital
                consent in your jurisdiction) to use Rawfeed. By registering,
                you represent that you meet this requirement.
              </p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                3.2 Account Registration
              </h3>
              <p>You are responsible for:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Providing accurate, complete, and current information</li>
                <li>Maintaining the confidentiality of your password</li>
                <li>All activities under your account</li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                3.3 Account Termination
              </h3>
              <p>
                You may delete your account at any time through your account
                settings. When you delete your account:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Your profile is immediately removed from public view</li>
                <li>Your posts are deleted from the platform</li>
                <li>
                  Your data is permanently purged after the 30-day backup
                  retention period
                </li>
                <li>
                  Other users' replies to your posts may still exist (you cannot
                  delete others' content)
                </li>
                <li>
                  Cached copies may persist for a brief period (minutes to
                  hours) while automatic cache expiration takes place
                </li>
              </ul>

              <p class="mt-4">
                We may also terminate accounts that violate these Terms or
                engage in abuse, spam, or illegal activity.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                4. User Conduct & Acceptable Use
              </h2>
              <p>You agree not to use Rawfeed to:</p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                4.1 Prohibited Conduct
              </h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Harassment & Abuse:</strong> Threaten, harass, bully,
                  or discriminate against other users based on protected
                  characteristics.
                </li>
                <li>
                  <strong>Illegal Activity:</strong> Post content that violates
                  applicable laws (hate speech, incitement to violence, child
                  exploitation, etc.).
                </li>
                <li>
                  <strong>Spam:</strong> Post repetitive, unsolicited content;
                  manipulate engagement metrics; use automation to artificially
                  inflate views, likes, or followers.
                </li>
                <li>
                  <strong>Misinformation:</strong> Post deliberate false
                  information intended to deceive or harm.
                </li>
                <li>
                  <strong>Scraping & Scrapers:</strong> Automated data scraping,
                  crawling, or collection without permission.
                </li>
                <li>
                  <strong>Account Impersonation:</strong> Impersonate others or
                  misrepresent your identity or affiliation.
                </li>
                <li>
                  <strong>Security Attacks:</strong> Attempt to hack, breach, or
                  disrupt the platform's security or infrastructure.
                </li>
                <li>
                  <strong>Unauthorized Commercial Use:</strong> Resell,
                  redistribute, or profit from the Service without
                  authorization.
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                4.2 Bots & Automation
              </h3>
              <p>Any bot accounts or automation must:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  Clearly identify themselves as automated accounts (e.g., with
                  "BOT" label)
                </li>
                <li>
                  Not engage in deceptive practices or manipulate engagement
                  metrics
                </li>
                <li>Respect rate limits and API guidelines</li>
                <li>
                  Have explicit user consent or clear disclosure (e.g., RSS
                  feeds from external sources)
                </li>
              </ul>

              <p class="mt-4">
                Rawfeed's native bot accounts (RSS feed importers) are
                transparently labeled and disclosed.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                5. Content & Intellectual Property Rights
              </h2>

              <h3 class="text-lg font-semibold mb-3">5.1 Your Content</h3>
              <p>
                You retain full ownership of all content you post on Rawfeed. By
                posting, you grant Rawfeed a worldwide, non-exclusive,
                royalty-free license to:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Display your content on your profile and in feeds</li>
                <li>Generate your RSS feed</li>
                <li>Create backups for security and recovery</li>
                <li>Comply with legal requests</li>
              </ul>

              <p class="mt-4">
                You are responsible for ensuring your content does not infringe
                third-party intellectual property rights.
              </p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                5.2 Rawfeed's Content
              </h3>
              <p>
                All Rawfeed software, design, and branding are owned by us or
                our licensors. The source code is licensed under the
                <a
                  href="https://www.gnu.org/licenses/agpl-3.0.html"
                  class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                >
                  AGPL-3.0 License
                </a>
                , which permits use, modification, and distribution under the
                same license terms.
              </p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                5.3 Third-Party Content
              </h3>
              <p>
                Content syndicated from RSS feeds (posted by bot accounts) is
                the copyright of the original authors and is used under fair use
                or the original publication's terms. We do not claim ownership
                of this content.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                6. Limitation of Liability
              </h2>

              <h3 class="text-lg font-semibold mb-3">6.1 "As-Is" Service</h3>
              <p>
                Rawfeed is provided on an "as-is" and "as-available" basis
                without warranties of any kind, either express or implied. We
                make no guarantee that:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  The Service will be uninterrupted, secure, or error-free
                </li>
                <li>
                  Your data will be permanently preserved (though we maintain
                  30-day backups)
                </li>
                <li>
                  Any bugs will be fixed or features requested will be
                  implemented
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                6.2 Exclusion of Damages
              </h3>
              <p>
                To the maximum extent permitted by law, we are not liable for:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Loss of data, revenue, profits, or opportunities</li>
                <li>
                  Indirect, incidental, punitive, or consequential damages
                </li>
                <li>User-generated content posted by other users</li>
                <li>Third-party services or external RSS feeds</li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">6.3 Data Loss</h3>
              <p>
                While we maintain backups and take security seriously, we are
                not responsible for:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Data loss due to user error or account deletion</li>
                <li>Failure to export or backup your data before deletion</li>
                <li>Data loss beyond the 30-day backup retention period</li>
              </ul>

              <p class="mt-4">
                We recommend you regularly export or backup your important posts
                and data.
              </p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                6.4 Third-Party Services
              </h3>
              <p>
                We are not responsible for the performance, privacy practices,
                or content of third-party services (Gravatar, Cloudflare, RSS
                feeds, etc.) that we integrate with.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">7. Indemnification</h2>
              <p>
                You agree to indemnify and hold us harmless from any claims,
                damages, or costs (including legal fees) arising from:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Your violation of these Terms</li>
                <li>Content you post or actions you take on Rawfeed</li>
                <li>Intellectual property infringement claims</li>
                <li>Your misuse of the Service</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                8. Public Forum; User-Generated Content
              </h2>
              <p>
                Rawfeed is a public platform. Any content you post is publicly
                visible unless you delete it. We are not responsible for:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  Others copying, sharing, or remixing your posts (this is the
                  nature of a public social platform)
                </li>
                <li>How third parties use content once it's been shared</li>
                <li>
                  Permanent copies on external platforms or archival services
                </li>
              </ul>

              <p class="mt-4">
                We encourage you to think carefully about what you share
                publicly.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                9. Suspension & Termination for Violations
              </h2>
              <p>
                We may suspend or terminate your account immediately if you:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Violate these Terms</li>
                <li>Engage in harassment, abuse, or illegal activity</li>
                <li>
                  Spam, manipulate engagement, or use the platform deceptively
                </li>
                <li>Pose a security threat to the platform or other users</li>
              </ul>

              <p class="mt-4">
                Upon suspension, your account will be inaccessible, but your
                data remains subject to the 30-day backup retention policy
                before permanent deletion. We may also report illegal activity
                to relevant authorities.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                10. Privacy & Data Protection
              </h2>
              <p>
                Your use of Rawfeed is also governed by our
                <a
                  href="/legal/privacy"
                  class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                >
                  Privacy Policy
                </a>
                . Please review it to understand our data practices.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                11. DMCA & Copyright Claims
              </h2>
              <p>
                If you believe content on Rawfeed infringes your copyright, you
                may submit a DMCA takedown notice. Please include:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>A description of the copyrighted work</li>
                <li>The URL of the infringing content</li>
                <li>
                  Your name, contact information, and statement under penalty of
                  perjury
                </li>
              </ul>

              <p class="mt-4">
                Send notices to:
                <a
                  href="mailto:i.ozguradem@gmail.com"
                  class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                >
                  i.ozguradem@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                12. Dispute Resolution & Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of the European Union and
                applicable local laws. Any disputes shall be handled informally
                through mutual negotiation. If negotiation fails, disputes will
                be subject to arbitration or the courts of competent
                jurisdiction in the EU.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">13. Entire Agreement</h2>
              <p>
                These Terms, along with our Privacy Policy and Cookie Policy,
                constitute the entire agreement between you and Rawfeed. If any
                part of these Terms is found unenforceable, the remaining parts
                will continue to apply.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">14. Contact Us</h2>
              <p>For questions about these Terms, please contact us at:</p>
              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded mt-4">
                <p>
                  <strong>Rawfeed Support:</strong>
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
              </div>
            </section>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
}
