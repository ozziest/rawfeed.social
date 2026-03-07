import type { PostWithContent } from "../../types/relations";
import type { TokenPayload } from "../../helpers/tokens";
import { Post } from "../components/posts/Post";

type PostsProps = {
  posts?: PostWithContent[];
  loggedUser?: TokenPayload;
  csrfToken?: string;
};

export function Posts({ posts, loggedUser, csrfToken }: PostsProps) {
  if (!posts || posts.length === 0) return "";

  return (
    <>
      {posts.map((post) => (
        <Post post={post} loggedUser={loggedUser} csrfToken={csrfToken} />
      ))}
    </>
  );
}
