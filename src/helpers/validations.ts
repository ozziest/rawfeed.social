import * as z from "zod";
import { RESERVED_USERNAMES } from "../consts";

export const validate = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): {
  isValid: boolean;
  isNotValid: boolean;
  errors: Record<string, string>;
} => {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      isValid: true,
      isNotValid: false,
      errors: {},
    };
  }

  const errors: Record<string, string> = {};

  result.error.issues.forEach((err) => {
    const fieldName = err.path.join(".");
    if (!errors[fieldName]) {
      errors[fieldName] = err.message;
    }
  });

  return {
    isValid: false,
    isNotValid: true,
    errors,
  };
};

export const USERNAME_SCHEMA = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(20)
  .regex(/^[a-z][a-z0-9-]*[a-z0-9]$/)
  .regex(/^(?!.*--)/)
  .refine((username) => !RESERVED_USERNAMES.includes(username));

export const HASHTAG_VALIDATION = z
  .string()
  .trim()
  .min(1)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/)
  .refine((val) => !/^\d+$/.test(val));

export const REGISTER_SCHEMA = z
  .object({
    username: USERNAME_SCHEMA,
    email: z.email().toLowerCase(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

export const LOGIN_SCHEMA = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const POST_SCHEMA = z.object({
  content: z.string().trim().min(1).max(400),
  location: z.enum(["tr", "en"]),
});

export const CUSTOM_DOMAIN_SCHEMA = z.object({
  domain: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(255)
    // Remove protocol if user accidentally includes it
    .transform((val) => val.replace(/^https?:\/\//, ""))
    // Remove trailing slash if exists
    .transform((val) => val.replace(/\/$/, ""))
    // Remove www. if exists (we'll handle it separately)
    .transform((val) => val.replace(/^www\./, ""))
    // Validate domain format (supports subdomains)
    .refine((val) => {
      // Basic domain regex: supports subdomains like blog.example.com
      const domainRegex = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/;
      return domainRegex.test(val);
    })
    // Prevent using rawfeed.social itself
    .refine((val) => !val.endsWith("rawfeed.social"))
    // Prevent localhost and common test domains
    .refine(
      (val) =>
        !["localhost", "test.local", "example.com", "example.org"].includes(
          val,
        ),
    ),
});
