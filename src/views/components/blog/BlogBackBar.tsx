
export function BlogBackBar() {
  return (
    <div class="border-b border-gray-200">
      <div class="max-w-3xl mx-auto px-4 py-4">
        <a
          href="/blog"
          class="inline-flex items-center gap-1 text-sm font-semibold text-black hover:text-gray-600 transition-colors"
        >
          &larr; Back to Blog
        </a>
      </div>
    </div>
  );
}
