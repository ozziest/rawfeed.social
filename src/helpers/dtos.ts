export type RegisterInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type PostInput = {
  content: string;
  location: string;
};

export type UserProfileParams = {
  username?: string;
};

export type CustomDomainInput = {
  domain: string;
};

export type HashtagViewParams = {
  hashtag?: string;
};

export type PostQueryParams = {
  cursor?: string;
  userId?: string;
  id?: string;
};
