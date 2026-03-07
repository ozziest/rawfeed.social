import type { PostMeta } from "../../../services/blog.service";
import { BlogPostCard } from "./BlogPostCard";

type BlogPostListProps = {
  posts: PostMeta[];
};

export function BlogPostList({ posts }: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <p class="text-gray-500 text-center py-16">
        No posts yet — check back soon.
      </p>
    );
  }

  return (
    <ul class="divide-y divide-gray-200">
      {posts.map((post) => (
        <li class="py-10">
          <BlogPostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
