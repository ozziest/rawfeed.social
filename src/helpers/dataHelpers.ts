/**
 * Helper functions for sanitizing and cleaning data
 */

/**
 * Remove sensitive fields from user objects
 */
export const sanitizeUser = (user: any) => {
  if (!user) return user;
  const { password, domain_verification_token, deleted_at, ...safeUser } = user;
  return safeUser;
};

/**
 * Remove user data from posts (for data exports where user is exported separately)
 */
export const sanitizePostsForExport = (posts: any[]) => {
  return posts.map((post) => {
    const { user, ...postWithoutUser } = post;
    return postWithoutUser;
  });
};

/**
 * Sanitize posts data by removing sensitive fields from nested user objects
 */
export const sanitizePostsWithUser = (posts: any[]) => {
  return posts.map((post) => ({
    ...post,
    user: sanitizeUser(post.user),
  }));
};
