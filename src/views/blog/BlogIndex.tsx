/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../types/views";
import type { PostMeta } from "../../services/blog.service";
import { LandingLayout } from "../layouts/LandingLayout";
import { Footer } from "../partials/Footer";

type BlogIndexProps = BaseProps & {
  posts: PostMeta[];
};

export function BlogIndex(props: BlogIndexProps) {
  const { posts } = props;

  return (
    <LandingLayout {...props}>
      <div class="bg-white min-h-screen">
        <div class="border-b-2 border-black">
          <div class="max-w-3xl mx-auto px-4 py-16 text-center">
            <h1 class="text-5xl sm:text-6xl font-bold text-black mb-4">Blog</h1>
            <p class="text-xl text-gray-600 max-w-xl mx-auto">
              Thoughts, guides, and updates on open feeds and decentralised
              social.
            </p>
          </div>
        </div>

        <div class="max-w-3xl mx-auto px-4 py-12">
          {posts.length === 0 ? (
            <p class="text-gray-500 text-center py-16">
              No posts yet — check back soon.
            </p>
          ) : (
            <ul class="divide-y divide-gray-200">
              {posts.map((post) => (
                <li class="py-10">
                  <article>
                    <div class="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <time datetime={post.date} safe>
                        {post.date}
                      </time>
                      <span>
                        {post.author ? (
                          <>
                            <span>&middot;</span>
                            <span safe>{post.author}</span>
                          </>
                        ) : undefined}
                      </span>
                    </div>
                    <h2 class="text-2xl font-bold text-black mb-2">
                      <a
                        href={`/blog/${post.slug}`}
                        class="hover:underline"
                        safe
                      >
                        {post.title}
                      </a>
                    </h2>
                    <div>
                      {post.excerpt ? (
                        <p class="text-gray-600 leading-relaxed mb-4" safe>
                          {post.excerpt}
                        </p>
                      ) : undefined}
                    </div>
                    <a
                      href={`/blog/${post.slug}`}
                      class="inline-flex items-center gap-1 font-semibold text-black border-b-2 border-black hover:text-gray-600 hover:border-gray-600 transition-colors text-sm"
                    >
                      Read more &rarr;
                    </a>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </LandingLayout>
  );
}
