export function BlogBackBar() {
  return (
    <div class="border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-3xl mx-auto px-4 py-4">
        <a
          href="/blog"
          class="inline-flex items-center gap-1 text-sm font-semibold text-black dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          &larr; Back to Blog
        </a>
      </div>
    </div>
  );
}
