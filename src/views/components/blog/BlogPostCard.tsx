import type { PostMeta } from "../../../services/blog.service";

type BlogPostCardProps = {
  post: PostMeta;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article>
      <div class="flex items-center gap-3 text-sm text-gray-500 mb-2">
        <time datetime={post.date} safe>
          {post.date}
        </time>
        {post.author ? (
          <span>
            <span>&middot;</span>
            <span safe>{post.author}</span>
          </span>
        ) : undefined}
      </div>
      <h2 class="text-2xl font-bold text-black mb-2">
        <a href={`/blog/${post.slug}`} class="hover:underline" safe>
          {post.title}
        </a>
      </h2>
      {post.excerpt ? (
        <p class="text-gray-600 leading-relaxed mb-4" safe>
          {post.excerpt}
        </p>
      ) : undefined}
      <a
        href={`/blog/${post.slug}`}
        class="inline-flex items-center gap-1 font-semibold text-black border-b-2 border-black hover:text-gray-600 hover:border-gray-600 transition-colors text-sm"
      >
        Read more &rarr;
      </a>
    </article>
  );
}
