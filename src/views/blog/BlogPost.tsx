import type { BaseProps } from "../../types/views";
import type { Post } from "../../services/blog.service";
import { LandingLayout } from "../layouts/LandingLayout";
import { Footer } from "../components/layout/Footer";
import { RawHtml } from "../partials/RawHtml";
import { BlogPostHeader } from "../components/blog/BlogPostHeader";
import { BlogBackBar } from "../components/blog/BlogBackBar";
import { BlogBackLink } from "../components/blog/BlogBackLink";

type BlogPostProps = BaseProps & {
  post: Post;
};

export function BlogPost(props: BlogPostProps) {
  const { post } = props;

  return (
    <LandingLayout {...props}>
      <div class="bg-white min-h-screen">
        <BlogBackBar />

        <article class="max-w-3xl mx-auto px-4 py-12">
          <BlogPostHeader post={post} />

          <RawHtml id="blog-content" html={post.html} />

          <footer class="mt-16 pt-8 border-t-2 border-black">
            <BlogBackLink />
          </footer>
        </article>
      </div>
      <Footer />
    </LandingLayout>
  );
}
