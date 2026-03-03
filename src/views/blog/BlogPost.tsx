/** @jsxImportSource @kitajs/html */
import type { BaseProps } from "../../types/views";
import type { Post } from "../../services/blog.service";
import { LandingLayout } from "../layouts/LandingLayout";
import { Footer } from "../partials/Footer";
import { RawHtml } from "../partials/RawHtml";

type BlogPostProps = BaseProps & {
  post: Post;
};

export function BlogPost(props: BlogPostProps) {
  const { post } = props;

  return (
    <LandingLayout {...props}>
      <div class="bg-white min-h-screen">
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

        <article class="max-w-3xl mx-auto px-4 py-12">
          <header class="mb-10 border-b-2 border-black pb-8">
            <div class="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <time datetime={post.date} safe>
                {post.date}
              </time>
            </div>
            <h1
              class="text-4xl sm:text-5xl font-bold text-black leading-tight mb-4"
              safe
            >
              {post.title}
            </h1>
            <div>
              {post.excerpt ? (
                <p class="text-xl text-gray-600 leading-relaxed" safe>
                  {post.excerpt}
                </p>
              ) : undefined}
            </div>
          </header>

          <RawHtml id="blog-content" html={post.html} />

          <footer class="mt-16 pt-8 border-t-2 border-black">
            <a
              href="/blog"
              class="inline-flex items-center gap-1 font-semibold text-black border-b-2 border-black hover:text-gray-600 hover:border-gray-600 transition-colors text-sm"
            >
              &larr; Back to Blog
            </a>
          </footer>
        </article>
      </div>
      <Footer />
    </LandingLayout>
  );
}
