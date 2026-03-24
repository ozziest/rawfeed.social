export function SidebarLinks() {
  return (
    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
      <div class="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
        <a href="/about" class="hover:underline">
          About
        </a>
        <a href="/blog" class="hover:underline">
          Blog
        </a>
        <a href="/budget" class="hover:underline">
          Budget
        </a>
        <a href="/legal/privacy" class="hover:underline">
          Privacy
        </a>
        <a href="/legal/terms" class="hover:underline">
          Terms
        </a>
        <a href="/legal/cookies" class="hover:underline">
          Cookies
        </a>
        <a href="/legal/data-rights" class="hover:underline">
          Data Rights
        </a>
        <a href="/legal/dpa" class="hover:underline">
          DPA
        </a>
        <a href="/legal/bots" class="hover:underline">
          Bots
        </a>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">
        &copy; 2026 rawfeed.social
      </p>
    </div>
  );
}
