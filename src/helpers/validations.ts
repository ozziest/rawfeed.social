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

export const DEFAULT_USERNAME_SCHEMA = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(20)
  .regex(/^[a-z][a-z0-9-]*[a-z0-9]$/)
  .regex(/^(?!.*--)/);

export const USERNAME_SCHEMA = DEFAULT_USERNAME_SCHEMA.refine(
  (username) => !username.startsWith("rss_"),
  {
    message: "This username prefix is reserved for automated accounts",
  },
).refine((username) => !RESERVED_USERNAMES.includes(username), {
  message: "This username is reserved and cannot be used",
});

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
    terms: z.enum(["confirmed"]),
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
  location: z.enum(["tr", "en", "da"]),
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

export const REPORT_REASONS = [
  "Spam",
  "Harassment or abuse",
  "Misinformation",
  "Copyright violation",
  "Violates Terms of Service",
  "Illegal content",
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number];

export const REPORT_POST_SCHEMA = z.object({
  reason: z.enum(REPORT_REASONS, { error: "Please select a reason" }),
  explanation: z.string().trim().max(1000).optional().default(""),
});

export const PROFILE_UPDATE_SCHEMA = z.object({
  name: z.string().trim().min(1).max(100),
  bio: z.string().trim().max(400),
  link: z
    .string()
    .trim()
    .max(2048)
    .optional()
    .refine(
      (val) => {
        if (!val) {
          // Allow undefined or empty string
          return true;
        }

        const parsed = z.string().url().safeParse(val);
        if (!parsed.success) {
          return false;
        }

        try {
          const url = new URL(val);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch {
          return false;
        }
      },
      {
        message: "Link must be a valid URL starting with http:// or https://",
      },
    ),
});

export const NOTIFICATION_SETTINGS_SCHEMA = z.object({
  notif_email_freq: z.enum(["off", "hourly", "daily", "weekly"]),
});

export const RSS_LANGUAGES = [
  { code: "af", label: "Afrikaans" },
  { code: "sq", label: "Albanian" },
  { code: "am", label: "Amharic" },
  { code: "ar", label: "Arabic" },
  { code: "hy", label: "Armenian" },
  { code: "az", label: "Azerbaijani" },
  { code: "eu", label: "Basque" },
  { code: "be", label: "Belarusian" },
  { code: "bn", label: "Bengali" },
  { code: "bs", label: "Bosnian" },
  { code: "bg", label: "Bulgarian" },
  { code: "ca", label: "Catalan" },
  { code: "zh", label: "Chinese (Simplified)" },
  { code: "zh-tw", label: "Chinese (Traditional)" },
  { code: "hr", label: "Croatian" },
  { code: "cs", label: "Czech" },
  { code: "da", label: "Danish" },
  { code: "nl", label: "Dutch" },
  { code: "en", label: "English" },
  { code: "et", label: "Estonian" },
  { code: "fi", label: "Finnish" },
  { code: "fr", label: "French" },
  { code: "gl", label: "Galician" },
  { code: "ka", label: "Georgian" },
  { code: "de", label: "German" },
  { code: "el", label: "Greek" },
  { code: "gu", label: "Gujarati" },
  { code: "he", label: "Hebrew" },
  { code: "hi", label: "Hindi" },
  { code: "hu", label: "Hungarian" },
  { code: "is", label: "Icelandic" },
  { code: "id", label: "Indonesian" },
  { code: "it", label: "Italian" },
  { code: "ja", label: "Japanese" },
  { code: "kn", label: "Kannada" },
  { code: "kk", label: "Kazakh" },
  { code: "ko", label: "Korean" },
  { code: "lv", label: "Latvian" },
  { code: "lt", label: "Lithuanian" },
  { code: "mk", label: "Macedonian" },
  { code: "ms", label: "Malay" },
  { code: "ml", label: "Malayalam" },
  { code: "mr", label: "Marathi" },
  { code: "no", label: "Norwegian" },
  { code: "fa", label: "Persian" },
  { code: "pl", label: "Polish" },
  { code: "pt", label: "Portuguese" },
  { code: "pa", label: "Punjabi" },
  { code: "ro", label: "Romanian" },
  { code: "ru", label: "Russian" },
  { code: "sr", label: "Serbian" },
  { code: "sk", label: "Slovak" },
  { code: "sl", label: "Slovenian" },
  { code: "es", label: "Spanish" },
  { code: "sw", label: "Swahili" },
  { code: "sv", label: "Swedish" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "th", label: "Thai" },
  { code: "tr", label: "Turkish" },
  { code: "uk", label: "Ukrainian" },
  { code: "ur", label: "Urdu" },
  { code: "uz", label: "Uzbek" },
  { code: "vi", label: "Vietnamese" },
  { code: "cy", label: "Welsh" },
] as const;

export type RssLanguageCode = (typeof RSS_LANGUAGES)[number]["code"];

const RSS_LANGUAGE_CODES = RSS_LANGUAGES.map((l) => l.code) as unknown as [
  RssLanguageCode,
  ...RssLanguageCode[],
];

export const RSS_SUGGESTION_SCHEMA = z.object({
  url: z
    .string()
    .trim()
    .min(1, "RSS feed URL is required")
    .max(768)
    .refine(
      (val) => {
        try {
          const url = new URL(val);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch {
          return false;
        }
      },
      { message: "Must be a valid URL starting with http:// or https://" },
    ),
  language: z.enum(RSS_LANGUAGE_CODES, { error: "Please select a language" }),
  is_owner: z
    .string()
    .optional()
    .transform((val) => val === "on" || val === "true" || val === "1"),
  terms: z.literal("confirmed", {
    error: "You must agree to the Terms of Service",
  }),
  dpa: z.literal("confirmed", {
    error: "You must agree to the Data Processing Agreement",
  }),
  bots: z.literal("confirmed", {
    error: "You must agree to the Bots & Automation policy",
  }),
  copyright: z.literal("confirmed", {
    error: "You must agree to the Copyright Policy",
  }),
});

export const RSS_REJECTION_REASONS = [
  "Pirated or copyright-infringing content",
  "Full-text republished content",
  "Adult or pornographic content",
  "Child exploitation material",
  "Hate speech and discrimination",
  "Violence and gore",
  "Terrorism and extremism",
  "Harassment and doxxing",
  "Malware and phishing",
  "Illegal goods and services",
  "Spam or low-quality content",
  "Deceptive or impersonating feeds",
  "Misinformation and conspiracy theories",
  "Gambling promotion",
  "Self-harm and pro-eating-disorder content",
  "Private or login-walled feeds",
  "Broken or inactive feeds",
  "Duplicate feeds",
] as const;

export type RssRejectionReason = (typeof RSS_REJECTION_REASONS)[number];

export const REJECT_RSS_SUGGESTION_SCHEMA = z.object({
  rejection_reason: z.enum(RSS_REJECTION_REASONS, {
    error: "Please select a rejection reason",
  }),
  admin_notes: z.string().trim().max(1000).optional().default(""),
});

const RSS_BOT_USERNAME_SCHEMA = z
  .string()
  .trim()
  .toLowerCase()
  .min(5, "Bot username must be at least 5 characters")
  .max(20)
  .regex(/^rss_[a-z][a-z0-9_]*[a-z0-9]$/, {
    message:
      "Bot username must start with rss_ and contain only lowercase letters, numbers, and underscores",
  });

export const UPDATE_FREQUENCY_OPTIONS = [
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every 4 hours", value: "0 */4 * * *" },
  { label: "Daily", value: "0 0 * * *" },
  { label: "Weekly", value: "0 0 * * 0" },
] as const;

export type UpdateFrequencyValue =
  (typeof UPDATE_FREQUENCY_OPTIONS)[number]["value"];

export const ACCEPT_RSS_SUGGESTION_SCHEMA = z.object({
  bot_username: RSS_BOT_USERNAME_SCHEMA,
  bot_name: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(255),
  bio: z.string().trim().max(400).optional().default(""),
  language: z.enum(RSS_LANGUAGE_CODES),
  update_frequency: z.enum(
    ["0 * * * *", "0 */4 * * *", "0 0 * * *", "0 0 * * 0"],
    { error: "Please select an update frequency" },
  ),
  category: z.string().trim().max(100).optional().default(""),
});
