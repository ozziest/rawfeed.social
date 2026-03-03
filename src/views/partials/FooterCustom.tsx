/** @jsxImportSource @kitajs/html */
export function FooterCustom() {
  return (
    <footer class="border-t border-gray-200 bg-white text-gray-500 text-sm mt-8">
      <div class="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>
          Powered by{" "}
          <a
            href="https://rawfeed.social/about"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-700 font-medium hover:underline"
          >
            Rawfeed
          </a>
        </span>
        <nav class="flex flex-wrap gap-x-4 gap-y-1 justify-center">
          <a
            href="https://rawfeed.social/legal/privacy"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="https://rawfeed.social/legal/terms"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline"
          >
            Terms of Service
          </a>
          <a
            href="https://rawfeed.social/legal/cookies"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline"
          >
            Cookie Policy
          </a>
        </nav>
      </div>
    </footer>
  );
}
