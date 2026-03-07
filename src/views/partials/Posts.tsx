import type { PostWithContent } from "../../types/relations";
import { Post } from "../components/posts/Post";

type PostsProps = {
  posts?: PostWithContent[];
};

export function Posts({ posts }: PostsProps) {
  if (!posts || posts.length === 0) return "";

  return (
    <>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </>
  );
}
