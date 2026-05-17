import type { BaseProps } from "../../types/views";
import { DefaultLayout } from "../layouts/DefaultLayout";

type Props = BaseProps;

export function PrivacyPage(props: Props) {
  return (
    <DefaultLayout {...props} title="Privacy Policy - Rawfeed">
      <>
        <div class="max-w-4xl mx-auto px-6 py-12">
          <h1 class="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Last Updated: 17 May 2026
          </p>

          <div class="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 class="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                Welcome to Rawfeed ("we," "our," or "us"). We are committed to
                protecting your privacy and ensuring transparency about how we
                handle your personal data. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information. We
                comply with the General Data Protection Regulation (GDPR), the
                California Consumer Privacy Act (CCPA), and other applicable
                privacy laws.
              </p>
              <p>
                Rawfeed is a non-profit, open-source microblogging platform
                designed around user sovereignty and data protection. We do not
                use algorithms to manipulate your feed, and we do not monetize
                your personal data.
              </p>
              <p class="mt-4">
                <strong>Data Controller:</strong> Ozgur Adem Isikli, Ingrid
                Marievej 28 Valby Denmark
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">2. Data We Collect</h2>

              <h3 class="text-lg font-semibold mb-3">
                2.1 Information You Provide Directly
              </h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Account Information:</strong> When you register, we
                  collect your email address, username, password (hashed with
                  bcrypt), display name, and optional bio.
                </li>
                <li>
                  <strong>Custom Domain:</strong> If you use a custom domain
                  feature, we collect your domain name and store domain
                  verification tokens to confirm ownership.
                </li>
                <li>
                  <strong>Posts & Content:</strong> When you create posts, we
                  collect the text content (up to 400 characters), metadata
                  about your posts (creation date, engagement metrics like
                  views, replies, likes, shares), and post relationships
                  (replies, reshares, mentions).
                </li>
                <li>
                  <strong>Interactions:</strong> We record your likes, shares,
                  replies, and mentions of other users.
                </li>
                <li>
                  <strong>RSS Feed Sources:</strong> If you add external RSS
                  feeds to the platform, we collect and store the feed URLs you
                  submit in order to fetch and syndicate that content.
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                2.2 Information Collected Automatically
              </h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Session Cookies:</strong> We use JWT tokens stored in
                  secure, httpOnly cookies to maintain your login session.
                </li>
                <li>
                  <strong>CSRF Tokens:</strong> We store CSRF protection tokens
                  to prevent cross-site request forgery attacks.
                </li>
                <li>
                  <strong>Flash Messages:</strong> We use functional cookies to
                  display form validation errors and success messages.
                </li>
                <li>
                  <strong>Third-Party Cookies:</strong> Cloudflare (CDN/DDoS
                  protection) may set its own cookies.
                </li>
                <li>
                  <strong>Access Logs:</strong> We may log IP addresses, browser
                  user agents, and request timestamps for security and debugging
                  purposes.
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                2.3 What We Do NOT Collect
              </h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>Analytics data (Google Analytics, Mixpanel, etc.)</li>
                <li>Behavioral tracking or profiling</li>
                <li>Location data (beyond what you share in your profile)</li>
                <li>Device fingerprinting or pixel tracking</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                3. Legal Basis for Processing (GDPR Article 6)
              </h2>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Contract:</strong> Processing your account data is
                  necessary to provide the service you've agreed to use.
                </li>
                <li>
                  <strong>Legitimate Interest:</strong> We may process data for
                  security (fraud prevention, abuse detection), legal
                  compliance, and platform improvement.
                </li>
                <li>
                  <strong>Consent:</strong> For non-essential cookies, we rely
                  on your implied consent when you continue using the platform.
                </li>
                <li>
                  <strong>Legal Obligation:</strong> We may retain certain data
                  to comply with laws or respond to legal requests.
                </li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">4. How We Use Your Data</h2>
              <ul class="list-disc pl-6 space-y-2">
                <li>To provide and maintain the Rawfeed platform</li>
                <li>To process your account and authentication</li>
                <li>To display your posts on your profile and in feeds</li>
                <li>
                  To track engagement metrics (views, replies, likes, shares)
                </li>
                <li>To detect and prevent abuse, spam, and security threats</li>
                <li>To respond to support requests and legal inquiries</li>
                <li>To improve platform functionality and user experience</li>
                <li>To generate your personal RSS feed for data portability</li>
                <li>
                  For backup and disaster recovery (30-day retention period)
                </li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                5. Data Retention & Deletion
              </h2>
              <p>
                When you delete your account or posts, we immediately remove
                them from public view. Deleted data is retained in backups for
                30 days to allow recovery in case of accidental deletion or
                service failure. After 30 days, all backups containing your data
                are permanently deleted.
              </p>
              <p class="mt-4">
                <strong>Cache & Performance Notes:</strong> Rawfeed uses a cache
                layer (Redis) to improve performance. When you delete content,
                we remove it from our primary database immediately, but cached
                copies may persist for a brief period (typically minutes to
                hours) depending on cache expiration settings. These cached
                copies are inaccessible to users and are automatically purged
                without manual intervention. If you need immediate confirmation
                of cache removal, please contact us.
              </p>
              <p>
                For security logs and access logs, we may retain anonymized or
                aggregated data for up to 90 days.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                6. AI Training & Data Scraping
              </h2>
              <p>
                <strong>We do not use your data for AI model training.</strong>{" "}
                Your personal information, posts, and content will never be used
                to train, fine-tune, or improve artificial intelligence models.
                This is a core commitment to your privacy.
              </p>
              <p class="mt-4">
                <strong>We do not sell your data for AI training.</strong> We
                will never sell your personal data, posts, or any user-generated
                content to third parties for AI training purposes under any
                circumstances, regardless of compensation offered.
              </p>
              <p class="mt-4">
                <strong>Regarding Web Scraping:</strong> All posts and public
                profiles on Rawfeed are publicly available on the internet.
                While we do not authorize, encourage, or facilitate web scraping
                for any purpose—including AI training—we acknowledge that we
                cannot technologically prevent third parties from scraping
                publicly available content. This is a technical reality of
                public web content and is beyond our control. If you become
                aware of unauthorized scraping, please contact us at
                <a
                  href="mailto:i.ozguradem@gmail.com"
                  class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                >
                  i.ozguradem@gmail.com
                </a>
                .
              </p>
              <p class="mt-4">
                For more information about how we handle your data, see our
                <a
                  href="/legal/dpa"
                  class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-semibold"
                >
                  Data Processing Agreement (DPA)
                </a>
                , which explicitly lists AI training as a
                <strong>prohibited</strong> data processing purpose.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                7. Data Processors & Third Parties
              </h2>
              <p>
                We share your data with the following third-party processors:
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-3 rounded mt-3 mb-3">
                For detailed information about data processors, retention
                policies, and security measures, see our
                <a
                  href="/legal/dpa"
                  class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-semibold"
                >
                  Data Processing Agreement (DPA)
                </a>
                .
              </p>

              <h3 class="text-lg font-semibold mb-3">7.1 Essential Services</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Database Host:</strong> Your data is stored on a MySQL
                  database hosted on DigitalOcean (Frankfurt am Main, Germany,
                  FRA1 region). Database backups are stored on AWS (Frankfurt,
                  EU-Central-1 region) for disaster recovery.
                </li>
                <li>
                  <strong>Redis Cache:</strong> Cached data is stored on a Redis
                  instance hosted on DigitalOcean (Frankfurt, Germany, FRA1
                  region) for performance optimization.
                </li>
                <li>
                  <strong>Cloudflare:</strong> CDN and DDoS protection service.
                  <a
                    href="https://www.cloudflare.com/privacypolicy/"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    Cloudflare Privacy Policy
                  </a>
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                7.2 Third-Party Services (Optional)
              </h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Sentry:</strong> Error tracking (does NOT receive
                  personally identifiable information due to low sampling rates
                  and PII exclusion).
                  <a
                    href="https://sentry.io/privacy/"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    Sentry Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>AWS SES:</strong> Email service for account
                  notifications (optional).
                  <a
                    href="https://aws.amazon.com/privacy/"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    AWS Privacy Policy
                  </a>
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                7.3 RSS Feed Auto-Creation
              </h3>
              <p>
                Rawfeed automatically creates bot accounts that ingest posts
                from external RSS feeds. These bots are clearly labeled and do
                not collect user data. See our{" "}
                <a
                  href="/legal/bots"
                  class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                >
                  Bot Account Disclosure
                </a>{" "}
                for details.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                8. Your GDPR Rights (Articles 15-22)
              </h2>
              <p>You have the following rights regarding your personal data:</p>

              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Right to Access (Article 15):</strong> Request a copy
                  of all personal data we hold about you.
                </li>
                <li>
                  <strong>Right to Rectification (Article 16):</strong> Correct
                  inaccurate data in your profile.
                </li>
                <li>
                  <strong>Right to Erasure (Article 17):</strong> Delete your
                  account and associated data (deletion after 30-day backup
                  period).
                </li>
                <li>
                  <strong>Right to Restrict Processing (Article 18):</strong>{" "}
                  Limit how we use your data.
                </li>
                <li>
                  <strong>Right to Data Portability (Article 20):</strong> Get
                  your data in a portable format. Use your account's export
                  feature or your personal RSS feed.
                </li>
                <li>
                  <strong>Right to Object (Article 21):</strong> Object to
                  certain data processing, including optional communications.
                </li>
                <li>
                  <strong>
                    Right to Not Be Subject to Automated Decision-Making
                    (Article 22):
                  </strong>
                  Rawfeed does not use algorithms to make decisions about your
                  account or content visibility.
                </li>
                <li>
                  <strong>Right to Lodge a Complaint:</strong> Contact your
                  national data protection authority (DPA).
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
              <h2 class="text-2xl font-bold mb-4">
                9. Non-Personalized Advertising (Future Policy)
              </h2>
              <p>
                If Rawfeed introduces advertising in the future, all ads will be
                non-personalized and contextual. We will never:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Build profiles based on your behavior</li>
                <li>Share your data with advertising networks</li>
                <li>
                  Use algorithmic targeting based on your posts or interactions
                </li>
                <li>Track you across websites</li>
              </ul>
              <p class="mt-4">
                Any advertising will be context-based (relevant to the content
                you're viewing) and fully transparent.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">10. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your
                data:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Passwords are hashed with bcrypt before storage</li>
                <li>
                  Session tokens use JWT with short expiration (10 minutes) and
                  secure, httpOnly cookies
                </li>
                <li>CSRF protection on all state-changing operations</li>
                <li>HTTPS enforced in production</li>
                <li>Content sanitization to prevent injection attacks</li>
                <li>Rate limiting on authentication endpoints</li>
              </ul>
              <p class="mt-4">
                However, no security system is 100% foolproof. If you discover a
                security vulnerability, please report it responsibly.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                11. International Data Transfers
              </h2>
              <p>
                Rawfeed is operated within the EU (Denmark) and all user data is
                stored within the EU/EEA:
              </p>
              <ul class="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Primary Database & Cache:</strong> DigitalOcean
                  (Frankfurt am Main, Germany)
                </li>
                <li>
                  <strong>Backup Storage:</strong> AWS (Frankfurt, Germany,
                  EU-Central-1 region)
                </li>
              </ul>
              <p class="mt-4">
                Your data is never transferred outside the EU/EEA. We comply
                fully with GDPR requirements for data location and storage.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">12. Children's Privacy</h2>
              <p>
                Rawfeed is not intended for children under 16 (or the applicable
                age of digital consent in your jurisdiction). We do not
                knowingly collect data from children. If we become aware that a
                child has provided us with data, we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                13. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy to reflect changes in laws,
                technology, or our practices. We will notify you of material
                changes by posting the updated policy here with an updated "Last
                Updated" date. Your continued use of Rawfeed after such changes
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">14. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data
                handling practices, you can contact us at:
              </p>
              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded mt-4">
                <p>
                  <strong>Data Controller & Privacy Contact:</strong>
                </p>
                <p>Ozgur Adem Isikli</p>
                <p>Ingrid Marievej 28 Valby Denmark</p>
                <p>
                  Email:
                  <a
                    href="mailto:i.ozguradem@gmail.com"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    i.ozguradem@gmail.com
                  </a>
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Note: Formal Data Protection Officer contact information will
                  be updated if/when Rawfeed becomes a registered organization.
                </p>
              </div>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">15. Regulatory References</h2>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <a
                    href="https://gdpr-info.eu/"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    EU General Data Protection Regulation (GDPR)
                  </a>
                </li>
                <li>
                  <a
                    href="https://oag.ca.gov/privacy/ccpa"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    California Consumer Privacy Act (CCPA)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ico.org.uk/"
                    class="text-black dark:text-gray-200 hover:underline dark:hover:text-white font-medium"
                  >
                    UK Information Commissioner's Office (ICO)
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
