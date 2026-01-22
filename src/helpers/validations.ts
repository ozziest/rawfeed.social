import * as z from "zod";

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

export const REGISTER_SCHEMA = z
  .object({
    username: z
      .string()
      .trim()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9_]+$/)
      .toLowerCase(),
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
