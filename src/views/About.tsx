import type { BaseProps } from "../types/views";
import { LandingLayout } from "./layouts/LandingLayout";

type Props = BaseProps;

export function AboutPage(props: Props) {
  return (
    <LandingLayout {...props} title="About - Rawfeed">
      <>
        <div class="relative min-h-screen flex items-center justify-center bg-white">
          <div class="relative max-w-4xl mx-auto px-4 py-24 text-center">
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-black mb-8 leading-tight">
              Reclaim Your Feed.
              <br />
              Reclaim Your Freedom.
            </h1>
            <p class="text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
              A chronological, algorithm-free, <strong>text-based</strong>{" "}
              social platform where <strong>you</strong> control what you see
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/register"
                class="px-8 py-4 bg-black text-white font-bold hover:bg-gray-800 transition-colors text-lg"
              >
                Join the Movement
              </a>
              <a
                href="#learn-more"
                class="px-8 py-4 bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white transition-all text-lg"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div class="border-y-2 border-black bg-white">
          <div class="max-w-4xl mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div class="text-6xl font-bold text-black mb-2">100%</div>
                <div class="text-gray-600 font-medium uppercase tracking-wide text-sm">
                  Algorithm-Free
                </div>
              </div>
              <div>
                <div class="text-6xl font-bold text-black mb-2">0</div>
                <div class="text-gray-600 font-medium uppercase tracking-wide text-sm">
                  Data Sold
                </div>
              </div>
              <div>
                <div class="text-6xl font-bold text-black mb-2">∞</div>
                <div class="text-gray-600 font-medium uppercase tracking-wide text-sm">
                  User Control
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="learn-more" class="bg-gray-50 py-24">
          <div class="max-w-4xl mx-auto px-4">
            <div class="text-center mb-16">
              <p class="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                The Problem
              </p>
              <h2 class="text-4xl sm:text-5xl font-bold text-black mb-6 leading-tight">
                Remember When Following Someone Actually Meant Something?
              </h2>
              <p class="text-xl text-gray-700 max-w-2xl mx-auto">
                Social media promised to connect us. Instead, it became a tool
                for manipulation and control.
              </p>
            </div>

            <div class="space-y-8">
              <div class="bg-white border-2 border-black p-8">
                <h3 class="text-2xl font-bold text-black mb-3">
                  Broken Promises
                </h3>
                <p class="text-gray-700 leading-relaxed text-lg">
                  The follow button still exists, but it's meaningless.
                  Algorithms decide what you see—not your choices.
                </p>
              </div>

              <div class="bg-white border-2 border-black p-8">
                <h3 class="text-2xl font-bold text-black mb-3">
                  The Engagement Trap
                </h3>
                <p class="text-gray-700 leading-relaxed text-lg">
                  Your feed is a slot machine optimized for outrage and dopamine
                  hits—not truth or value.
                </p>
              </div>

              <div class="bg-white border-2 border-black p-8">
                <h3 class="text-2xl font-bold text-black mb-3">
                  Corporate Control
                </h3>
                <p class="text-gray-700 leading-relaxed text-lg">
                  A handful of companies gatekeep what billions see and think.
                  That power shouldn't exist.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white py-24 border-y-2 border-black">
          <div class="max-w-4xl mx-auto px-4">
            <div class="text-center mb-16">
              <p class="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                Our Solution
              </p>
              <h2 class="text-4xl sm:text-5xl font-bold text-black mb-6 leading-tight">
                A Better Way
              </h2>
              <p class="text-xl text-gray-700">
                Rawfeed returns control to users through radical simplicity
              </p>
            </div>

            <div class="space-y-6">
              <div class="border-l-4 border-black pl-6 py-4">
                <h3 class="text-2xl font-bold text-black mb-2">
                  Chronological Always
                </h3>
                <p class="text-gray-700 text-lg leading-relaxed">
                  Posts appear in the order they were published. No algorithms
                  deciding what you see. What you subscribe to is what you get.
                </p>
              </div>

              <div class="border-l-4 border-black pl-6 py-4">
                <h3 class="text-2xl font-bold text-black mb-2">
                  True Following
                </h3>
                <p class="text-gray-700 text-lg leading-relaxed">
                  Follow someone = see their posts. Every single time. Period.
                  The follow button actually means something here.
                </p>
              </div>

              <div class="border-l-4 border-black pl-6 py-4">
                <h3 class="text-2xl font-bold text-black mb-2">Text-Based</h3>
                <p class="text-gray-700 text-lg leading-relaxed">
                  This is a text-based social media platform. 400 characters to
                  express ideas worth spreading. No images, no videos—just pure
                  thought and conversation.
                </p>
              </div>

              <div class="border-l-4 border-black pl-6 py-4">
                <h3 class="text-2xl font-bold text-black mb-2">RSS Built-In</h3>
                <p class="text-gray-700 text-lg leading-relaxed">
                  Every profile has an RSS feed. Own your reading experience. No
                  lock-in.
                </p>
              </div>

              <div class="border-l-4 border-black pl-6 py-4">
                <h3 class="text-2xl font-bold text-black mb-2">
                  Open Source & Transparent
                </h3>
                <p class="text-gray-700 text-lg leading-relaxed">
                  Full source code visibility means no hidden agendas.
                  Community-owned forever. What you see is what you get.
                </p>
              </div>

              <div class="border-l-4 border-black pl-6 py-4">
                <h3 class="text-2xl font-bold text-black mb-2">
                  Privacy-First
                </h3>
                <p class="text-gray-700 text-lg leading-relaxed">
                  No tracking. No selling your data. Your attention is not our
                  product.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 py-24">
          <div class="max-w-4xl mx-auto px-4">
            <div class="text-center mb-16">
              <p class="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                Why It Matters
              </p>
              <h2 class="text-4xl sm:text-5xl font-bold text-black mb-6 leading-tight">
                This Is About Fundamental Freedoms
              </h2>
              <p class="text-xl text-gray-700">
                Not just convenience. Real freedom of expression and connection.
              </p>
            </div>

            <div class="space-y-8">
              <div class="bg-white border-2 border-black p-8">
                <h3 class="text-2xl font-bold text-black mb-3">
                  Freedom of Speech
                </h3>
                <p class="text-gray-700 text-lg leading-relaxed">
                  Actually reach your audience without algorithmic gatekeeping
                </p>
              </div>

              <div class="bg-white border-2 border-black p-8">
                <h3 class="text-2xl font-bold text-black mb-3">
                  User Sovereignty
                </h3>
                <p class="text-gray-700 text-lg leading-relaxed">
                  Your content, your rules. Export your data anytime, host
                  anywhere
                </p>
              </div>

              <div class="bg-white border-2 border-black p-8">
                <h3 class="text-2xl font-bold text-black mb-3">
                  Community-Owned
                </h3>
                <p class="text-gray-700 text-lg leading-relaxed">
                  Open source, transparent governance, no corporate overlords
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white py-24 border-y-2 border-black">
          <div class="max-w-4xl mx-auto px-4">
            <div class="text-center mb-16">
              <p class="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                Flexibility
              </p>
              <h2 class="text-4xl sm:text-5xl font-bold text-black mb-6 leading-tight">
                One Platform, Two Paths
              </h2>
              <p class="text-xl text-gray-700">
                Use Rawfeed as a social network, a personal microblog, or both
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 mb-12">
              <div class="bg-white border-2 border-black p-8">
                <h3 class="text-2xl font-bold text-black mb-6 pb-4 border-b-2 border-black">
                  Social Network
                </h3>
                <ul class="space-y-3 text-gray-700">
                  <li>→ Follow users and grow your audience</li>
                  <li>→ Engage in conversations and threads</li>
                  <li>→ Discover new voices in your feed</li>
                  <li>→ Profile at rawfeed.social/username</li>
                </ul>
              </div>

              <div class="bg-white border-2 border-black p-8">
                <h3 class="text-2xl font-bold text-black mb-6 pb-4 border-b-2 border-black">
                  Personal Microblog
                </h3>
                <ul class="space-y-3 text-gray-700">
                  <li>→ Point your own domain to your profile</li>
                  <li>→ Use it as your personal publishing platform</li>
                  <li>→ No WordPress, no Medium—just simple posts</li>
                  <li>→ Profile at yourdomain.com—your brand</li>
                </ul>
              </div>
            </div>

            <div class="text-center bg-gray-50 border-2 border-black p-8">
              <p class="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                Or Both
              </p>
              <h3 class="text-2xl font-bold text-black mb-4">
                Same Chronological Feed, Same Simple Publishing
              </h3>
              <p class="text-lg text-gray-700">
                We built the infrastructure. You choose how to use it. Switch
                between social and solo anytime—or do both simultaneously.
              </p>
            </div>
          </div>
        </div>

        <div class="relative bg-white py-20 border-b-2 border-black">
          <div class="max-w-4xl mx-auto px-4">
            <div class="bg-white p-10 sm:p-16">
              <div class="text-center">
                <div class="inline-block px-5 py-3 bg-black text-white font-bold mb-6 text-sm uppercase tracking-wide">
                  Currently in Active Development
                </div>
                <h2 class="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                  Building in the Open
                </h2>
                <p class="text-xl text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
                  We're building transparently because honesty matters. Not
                  ready for public use yet, but you can watch our progress and
                  contribute.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://github.com/ozziest/rawfeed.social"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-bold text-lg border-2 border-black"
                  >
                    View on GitHub
                  </a>
                  <a
                    href="https://github.com/ozziest/rawfeed.social/blob/main/ROADMAP.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold border-2 border-black text-lg"
                  >
                    View Roadmap
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="relative bg-gray-50 py-24">
          <div class="relative max-w-4xl mx-auto px-4">
            <div class="text-center mb-16">
              <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                Join the Movement
              </h2>
              <p class="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
                We need you. This project succeeds only as a community effort.
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-6 mb-12">
              <div class="bg-white border-2 border-black p-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-black pb-3">
                  For Developers
                </h3>
                <p class="text-gray-700 mb-6 text-lg">
                  Help build the platform
                </p>
                <a
                  href="https://github.com/ozziest/rawfeed.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-gray-900 font-bold text-lg"
                >
                  → Contribute Code
                </a>
              </div>

              <div class="bg-white border-2 border-black p-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-black pb-3">
                  For Designers
                </h3>
                <p class="text-gray-700 mb-6 text-lg">Make it beautiful</p>
                <a
                  href="https://github.com/ozziest/rawfeed.social/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-gray-900 font-bold text-lg"
                >
                  → Join Discussions
                </a>
              </div>

              <div class="bg-white border-2 border-black p-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-black pb-3">
                  For Everyone
                </h3>
                <p class="text-gray-700 mb-6 text-lg">Spread the word</p>
                <a
                  href="https://github.com/ozziest/rawfeed.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-gray-900 font-bold text-lg"
                >
                  → Star on GitHub
                </a>
              </div>
            </div>

            <div class="bg-white border-2 border-black p-10 sm:p-12 max-w-3xl mx-auto">
              <p class="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                Ready to reclaim your feed?
              </p>
              <div class="text-center">
                <a
                  href="/auth/register"
                  class="inline-block px-12 py-5 bg-black text-white font-bold text-xl"
                >
                  Create Your Account
                </a>
                <p class="text-gray-700 mt-6 text-base">
                  Free forever • No credit card • No tracking
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </LandingLayout>
  );
}
