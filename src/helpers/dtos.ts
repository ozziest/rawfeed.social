export type RegisterInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  "cf-turnstile-response": string;
};

export type LoginInput = {
  email: string;
  password: string;
  "cf-turnstile-response": string;
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

export type ProfileUpdateInput = {
  name: string;
  bio: string;
  link?: string;
};

export type HashtagViewParams = {
  hashtag?: string;
};

export type PostQueryParams = {
  cursor?: string;
  userId?: string;
  id?: string;
  followingUserIds?: string[];
  loggedUserId?: string;
};

export type ForgotPasswordInput = {
  email: string;
  "cf-turnstile-response": string;
};

export type ResetPasswordInput = {
  token: string;
  password: string;
  confirmPassword: string;
  "cf-turnstile-response": string;
};
