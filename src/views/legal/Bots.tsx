import type { BaseProps } from "../../types/views";
import { DefaultLayout } from "../layouts/DefaultLayout";

type Props = BaseProps;

export function BotsLegalPage(props: Props) {
  return (
    <DefaultLayout {...props} title="Bots & Automation - Rawfeed">
      <>
        <div class="max-w-4xl mx-auto px-6 py-12">
          <h1 class="text-4xl font-bold mb-2">
            Bot Accounts & Automated Content
          </h1>
          <p class="text-gray-600 mb-8">Last Updated: February 2026</p>

          <div class="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 class="text-2xl font-bold mb-4">What Are Bot Accounts?</h2>
              <p>
                On Rawfeed, bot accounts are automated accounts that syndicate
                content from external RSS feeds. These accounts are clearly
                labeled with a "BOT" designation so you know which accounts are
                human users and which are automated.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">1. How Bot Accounts Work</h2>

              <h3 class="text-lg font-semibold mb-3">
                1.1 Automated Content Ingestion
              </h3>
              <p>
                Rawfeed automatically creates bot accounts for curated external
                RSS feeds across various categories:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Technology:</strong> Hacker News, TechCrunch, The
                  Verge, etc.
                </li>
                <li>
                  <strong>News & Politics:</strong> Reuters, Associated Press,
                  BBC, etc.
                </li>
                <li>
                  <strong>Science & Nature:</strong> Nature, Science Daily,
                  NASA, etc.
                </li>
                <li>
                  <strong>Business & Economics:</strong> Bloomberg, Financial
                  Times, Economist, etc.
                </li>
                <li>
                  <strong>Entertainment & Culture:</strong> Various
                  entertainment publications
                </li>
                <li>
                  <strong>Gaming & Sports:</strong> Various gaming and sports
                  outlets
                </li>
                <li>
                  <strong>And many more...</strong>
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">1.2 Bot Behavior</h3>
              <p>Bot accounts:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  Automatically post articles and content from their source RSS
                  feeds
                </li>
                <li>Cannot reply, like, or engage with other posts</li>
                <li>
                  Are not influenced by user interactions or engagement metrics
                </li>
                <li>
                  Mirror only publicly available content from their sources
                </li>
                <li>
                  Are subject to the same visibility rules as human accounts:
                  you only see bot posts if you follow the bot, visit its
                  profile directly, or see a reshare from an account you follow
                </li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                2. Transparency & Identification
              </h2>

              <h3 class="text-lg font-semibold mb-3">2.1 Bot Label</h3>
              <p>
                Every bot account has a prominent "BOT" label next to its name
                in your feed. This makes it immediately obvious that the content
                is automated and not from a human user.
              </p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                2.2 Source Attribution
              </h3>
              <p>
                Each bot account clearly identifies its source. For example:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <code>@rss_techdaily</code> — Syndicates TechCrunch
                </li>
                <li>
                  <code>@rss_news_wire</code> — Syndicates Reuters
                </li>
                <li>
                  <code>@rss_spacenews</code> — Syndicates NASA/Space news
                </li>
              </ul>

              <p class="mt-4">
                Bot profiles clearly state that they are automated content
                aggregators.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                3. Privacy & Data Protection
              </h2>

              <h3 class="text-lg font-semibold mb-3">
                3.1 What Bot Accounts Do NOT Do
              </h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Collect User Data:</strong> Bot accounts do not
                  monitor, track, or collect data about other users.
                </li>
                <li>
                  <strong>Monitor Interactions:</strong> Bot accounts do not see
                  or analyze who reads their posts.
                </li>
                <li>
                  <strong>Sell or Share Data:</strong> No user data is ever
                  sold, shared, or provided to third parties.
                </li>
                <li>
                  <strong>Create Profiles:</strong> No user profiles or
                  behavioral profiles are created.
                </li>
                <li>
                  <strong>Engage in Manipulation:</strong> Bots do not
                  artificially inflate engagement metrics or manipulate feeds.
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                3.2 Source Attribution & Licensing
              </h3>
              <p>
                All content posted by bot accounts is from publicly available
                RSS feeds. Bot accounts respect the original authors' copyright
                and licensing:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  Original links are preserved (clicking a post redirects to the
                  original source)
                </li>
                <li>Authors and publications are credited</li>
                <li>
                  Content is used under fair use and public sharing agreements
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                3.3 No Personalization or Algorithmic Ranking
              </h3>
              <p>Unlike traditional social media, Rawfeed does not:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  Use algorithms to rank bot posts differently for different
                  users
                </li>
                <li>Promote or demote bot posts based on engagement</li>
                <li>Target bot content based on user behavior</li>
              </ul>

              <p class="mt-4">
                Bot posts appear in chronological order on timelines of users
                who follow them, just like posts from human accounts. No
                algorithmic manipulation occurs—all posts are displayed
                chronologically to their respective followers.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">4. Managing Bot Content</h2>

              <h3 class="text-lg font-semibold mb-3">
                4.1 Follow & Unfollow Bot Accounts
              </h3>
              <p>
                Bot accounts are regular accounts in the Rawfeed system. You
                control which bots you see through the standard follow/unfollow
                mechanism:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Follow:</strong> Click Follow to see posts from that
                  bot in your chronological feed
                </li>
                <li>
                  <strong>Unfollow:</strong> Click Unfollow to stop seeing that
                  bot's posts
                </li>
                <li>
                  <strong>Visit Profile:</strong> View any bot's profile
                  directly anytime to see their posts, without following
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                4.2 Muting Bot Accounts
              </h3>
              <p>
                If you prefer not to see posts from specific bot accounts you
                follow, you can mute them. While muted, their posts will not
                appear in your feed, but you can unmute at any time.
              </p>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                4.3 Blocking Bot Accounts
              </h3>
              <p>
                You can block bot accounts if you don't want them to appear on
                your timeline or in search results.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                5. Why We Use Bot Accounts
              </h2>

              <h3 class="text-lg font-semibold mb-3">
                5.1 Content Curation & Discovery
              </h3>
              <p>
                Bot accounts help surface quality, verified content from trusted
                sources. This provides:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>A diverse range of high-quality sources in one place</li>
                <li>
                  Fair, chronological access to curated content (no algorithmic
                  manipulation)
                </li>
                <li>
                  Support for users who want to follow specific topics or
                  publications
                </li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                5.2 User Control & Decentralization
              </h3>
              <p>
                Unlike algorithm-driven platforms where recommendations are
                opaque, Rawfeed's bot accounts are:
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Transparent and clearly labeled</li>
                <li>Chronological and non-manipulative</li>
                <li>Controllable (mute, block, or filter as you see fit)</li>
              </ul>

              <h3 class="text-lg font-semibold mb-3 mt-4">
                5.3 Supporting Open Publishing Standards
              </h3>
              <p>
                Rawfeed is RSS-native. By aggregating RSS feeds, we support open
                publishing standards and reduce dependence on proprietary
                algorithms.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                6. Difference Between Bot Accounts & Human Users
              </h2>

              <table class="w-full mt-4 border-collapse border border-gray-300">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left">
                      Feature
                    </th>
                    <th class="border border-gray-300 px-4 py-2 text-left">
                      Human Accounts
                    </th>
                    <th class="border border-gray-300 px-4 py-2 text-left">
                      Bot Accounts
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 px-4 py-2">
                      <strong>Posting</strong>
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      Manual, by user
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      Automated from RSS feeds
                    </td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2">
                      <strong>Interactions</strong>
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      Can reply, like, share
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      Read-only (no interactions)
                    </td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 px-4 py-2">
                      <strong>Followers/Following</strong>
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      Can follow and be followed
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      Can be followed by users; visibility controlled by
                      follow/unfollow
                    </td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2">
                      <strong>Personal Data Collection</strong>
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      Name, email, bio, etc.
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      None from other users
                    </td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 px-4 py-2">
                      <strong>Label</strong>
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      None (regular account)
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      "BOT" badge
                    </td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2">
                      <strong>Chronological Feed</strong>
                    </td>
                    <td class="border border-gray-300 px-4 py-2">Yes</td>
                    <td class="border border-gray-300 px-4 py-2">
                      Yes (same as humans)
                    </td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 px-4 py-2">
                      <strong>Transparency</strong>
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      Identity under user control
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                      Clearly marked as automated
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">
                7. Our Commitment to Fair Use
              </h2>
              <p>We are committed to:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  <strong>Transparency:</strong> Every bot account is clearly
                  labeled and its source is disclosed.
                </li>
                <li>
                  <strong>No Manipulation:</strong> Bot posts are not
                  artificially promoted or ranked higher.
                </li>
                <li>
                  <strong>User Control:</strong> You can easily mute or block
                  bot accounts.
                </li>
                <li>
                  <strong>Copyright Respect:</strong> We respect all copyright
                  and licensing agreements.
                </li>
                <li>
                  <strong>No Monetization of User Data:</strong> We never sell
                  or profit from user data generated by bot-related activities.
                </li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">8. Questions or Concerns?</h2>
              <p>
                If you have concerns about bot accounts or their behavior,
                please contact us:
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
