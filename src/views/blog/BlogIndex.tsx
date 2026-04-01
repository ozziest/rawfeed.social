import type { BaseProps } from "../../types/views";
import type { PostMeta } from "../../services/blog.service";
import { LandingLayout } from "../layouts/LandingLayout";
import { Footer } from "../components/layout/Footer";
import { BlogPostList } from "../components/blog/BlogPostList";
import { BlogHero } from "../components/blog/BlogHero";

type BlogIndexProps = BaseProps & {
  posts: PostMeta[];
};

export function BlogIndex(props: BlogIndexProps) {
  const { posts } = props;

  return (
    <LandingLayout {...props}>
      <div class="bg-white dark:bg-gray-900 min-h-screen">
        <BlogHero />

        <div class="max-w-3xl mx-auto px-4 py-12">
          <BlogPostList posts={posts} />
        </div>
      </div>
    </LandingLayout>
  );
}
