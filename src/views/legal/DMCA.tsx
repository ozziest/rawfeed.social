import type { BaseProps } from "../../types/views";
import { DefaultLayout } from "../layouts/DefaultLayout";

type Props = BaseProps;

export function DMCAPage(props: Props) {
  return (
    <DefaultLayout {...props} title="Copyright Policy - Rawfeed">
      <>
        <div class="max-w-4xl mx-auto px-6 py-12">
          <h1 class="text-4xl font-bold mb-2">Copyright Policy</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Last Updated: 05 April 2026
          </p>

          <div class="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 class="text-2xl font-bold mb-4">1. Overview</h2>
              <p>
                Rawfeed is a non-profit, open-source project. We are not a
                company and are not registered under any national jurisdiction.
                Nevertheless, we deeply respect the intellectual property rights
                of creators everywhere in the world — regardless of whether they
                are based in the US, the EU, or anywhere else.
              </p>
              <p class="mt-4">
                This policy is a <strong>voluntary commitment</strong> by
                Rawfeed to protect the copyright of content creators globally.
                We have chosen to follow principles inspired by the US Digital
                Millennium Copyright Act (DMCA) as a widely recognized
                framework, but this policy applies to all users worldwide and is
                not limited to any single legal system or country.
              </p>
              <p class="mt-4">
                If you believe that content hosted on Rawfeed infringes your
                copyright, you may submit a takedown request as described below.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                2. RSS Feed Syndication &amp; User Responsibility
              </h2>
              <p>
                Rawfeed allows users to add external RSS feeds to the platform.
                When a user adds an RSS feed, Rawfeed fetches and displays that
                content on their behalf. In this model, the user who submits the
                RSS source — not Rawfeed — is responsible for ensuring that:
              </p>
              <ul class="list-disc pl-6 mt-4 space-y-2">
                <li>
                  The RSS feed is publicly available and intended for
                  syndication by its publisher.
                </li>
                <li>
                  The feed's content does not infringe the copyright of any
                  third party.
                </li>
                <li>
                  The original publisher's terms of use permit the feed to be
                  syndicated in this manner.
                </li>
              </ul>
              <p class="mt-4">
                Rawfeed reviews user-submitted RSS feeds for technical validity,
                source quality, and safety — but does <strong>not</strong>{" "}
                independently verify the copyright status of any feed or its
                contents. The user who submits a feed is responsible for
                ensuring it is lawfully available for syndication. If a
                rights-holder believes a syndicated RSS feed infringes their
                copyright, they may submit a takedown request using the process
                described in Section 4 below.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">3. Copyright Contact</h2>
              <p>
                All copyright takedown requests and counter-notices must be sent
                to:
              </p>
              <div class="mt-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 space-y-1">
                <p>
                  <strong>Contact:</strong> Rawfeed
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:hello@rawfeed.social"
                    class="text-black dark:text-gray-200 hover:underline"
                  >
                    hello@rawfeed.social
                  </a>
                </p>
              </div>
              <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Email is the only supported channel for copyright requests.
                Requests sent through other means may not be seen or processed.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                4. Filing a Copyright Takedown Request
              </h2>
              <p>
                To submit a valid takedown request, your written communication
                must include <strong>all</strong> of the following elements:
              </p>
              <ol class="list-decimal pl-6 mt-4 space-y-3">
                <li>
                  <strong>Identification of the copyrighted work:</strong> A
                  description of the copyrighted work you claim has been
                  infringed. If multiple works are covered by a single notice,
                  provide a representative list.
                </li>
                <li>
                  <strong>Identification of the infringing material:</strong>{" "}
                  The exact URL(s) or sufficient description of the infringing
                  content on Rawfeed, so that we can locate it.
                </li>
                <li>
                  <strong>Your contact information:</strong> Your full name,
                  mailing address, telephone number, and email address.
                </li>
                <li>
                  <strong>Good faith statement:</strong> A statement that you
                  have a good faith belief that the use of the material in the
                  manner complained of is not authorized by the copyright owner,
                  its agent, or the law.
                </li>
                <li>
                  <strong>Accuracy statement:</strong> A statement that the
                  information in the notification is accurate and that you are
                  authorized to act on behalf of the owner of an exclusive right
                  that is allegedly infringed.
                </li>
                <li>
                  <strong>Physical or electronic signature:</strong> A physical
                  or electronic signature of a person authorized to act on
                  behalf of the copyright owner.
                </li>
              </ol>
              <p class="mt-4 text-sm text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3">
                <strong>Please act in good faith.</strong> Submitting a takedown
                request for content you know is not infringing — for example, to
                silence criticism or remove lawful content — is an abuse of this
                process. We reserve the right to reject such requests and take
                appropriate action.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                5. Our Response &amp; Processing Timeline
              </h2>
              <p>
                Upon receiving a complete and valid takedown request, Rawfeed
                will:
              </p>
              <ul class="list-disc pl-6 mt-4 space-y-2">
                <li>
                  <strong>Within 2 business days:</strong> Send an
                  acknowledgement that your notice has been received.
                </li>
                <li>
                  <strong>Within 5–10 business days:</strong> Review the notice
                  for completeness. If the notice is complete and valid, we will
                  remove or disable access to the allegedly infringing content
                  and notify the user who posted it.
                </li>
                <li>
                  <strong>Incomplete notices:</strong> If your notice is missing
                  required information, we will contact you to request the
                  missing details. The timeline restarts once a complete notice
                  is received.
                </li>
              </ul>
              <p class="mt-4">
                We reserve the right not to act on notices that are clearly
                incomplete, abusive, or submitted in bad faith.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                6. Counter-Notification Process
              </h2>
              <p>
                If you believe your content was removed in error or
                misidentification, you may submit a counter-notification. Your
                counter-notice must include:
              </p>
              <ol class="list-decimal pl-6 mt-4 space-y-3">
                <li>
                  <strong>Your contact information:</strong> Your full name,
                  mailing address, telephone number, and email address.
                </li>
                <li>
                  <strong>Identification of removed content:</strong> A
                  description of the content that was removed and the URL where
                  it appeared before removal.
                </li>
                <li>
                  <strong>Good faith statement:</strong> A statement that you
                  have a good faith belief the content was removed as a result
                  of mistake or misidentification.
                </li>
                <li>
                  <strong>Physical or electronic signature.</strong>
                </li>
              </ol>
              <p class="mt-4">
                Upon receiving a valid counter-notice, we will forward it to the
                original complainant. If the complainant does not notify us that
                they have filed a court action within{" "}
                <strong>10–14 business days</strong>, we may restore the removed
                content.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">7. Repeat Infringers</h2>
              <p>
                Rawfeed has a policy of terminating or suspending accounts of
                users who are found to be repeat infringers of intellectual
                property rights in appropriate circumstances.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
              <p>
                We may update this Copyright Policy from time to time. Any
                changes will be posted on this page with an updated "Last
                Updated" date. Continued use of the Service after changes are
                posted constitutes your acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">9. Contact</h2>
              <p>
                For copyright questions or to submit a takedown request, contact
                us at{" "}
                <a
                  href="mailto:hello@rawfeed.social"
                  class="text-black dark:text-gray-200 hover:underline font-medium"
                >
                  hello@rawfeed.social
                </a>
                . We welcome reports from users anywhere in the world.
              </p>
            </section>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
}
