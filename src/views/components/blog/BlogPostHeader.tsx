import type { Post } from "../../../services/blog.service";

type BlogPostHeaderProps = {
  post: Post;
};

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header class="mb-10 border-b-2 border-black dark:border-gray-700 pb-8">
      <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <time datetime={post.date} safe>
          {post.date}
        </time>
      </div>
      <h1
        class="text-4xl sm:text-5xl font-bold text-black dark:text-gray-100 leading-tight mb-4"
        safe
      >
        {post.title}
      </h1>
      {post.excerpt ? (
        <p
          class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
          safe
        >
          {post.excerpt}
        </p>
      ) : undefined}
    </header>
  );
}
