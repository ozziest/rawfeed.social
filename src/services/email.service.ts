import { logError } from "../helpers/common";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import sanitizeHtml from "sanitize-html";
import type { NotificationWithTriggers } from "../types/relations";

const esc = (text: string): string =>
  sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} });

const safeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return url;
    }
  } catch {
    // invalid URL
  }
  return "#";
};

type CreateEmailOptions = {
  to: string;
  subject: string;
  html: string;
};

const FROM_EMAIL = "noreply@rawfeed.social";

const REPORT_RECIPIENT = "hello@rawfeed.social";

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const sendEmail = async (options: CreateEmailOptions): Promise<void> => {
  if (process.env.NODE_ENV === "development") {
    console.log(options.html);
    return;
  }

  await ses.send(
    new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [options.to] },
      Message: {
        Subject: { Data: options.subject, Charset: "UTF-8" },
        Body: { Html: { Data: options.html, Charset: "UTF-8" } },
      },
    }),
  );
};

export const sendDataExportReadyEmail = async (
  to: string,
  username: string,
  downloadUrl: string,
): Promise<void> => {
  try {
    const options: CreateEmailOptions = {
      to,
      subject: "Your Data Export is Ready",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your Data Export is Ready</h2>
          <p>Hi ${username},</p>
          <p>Your complete data archive has been generated and is ready for download.</p>
          <p style="margin: 30px 0;">
            <a href="${downloadUrl}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Download Your Archive
            </a>
          </p>
          <p style="color: #666; font-size: 14px;">
            <strong>File format:</strong> ZIP archive containing your data in JSON format.
          </p>
          <p style="color: #666; font-size: 14px;">
            <strong>Important:</strong> This download link will expire in 24 hours for security reasons.
          </p>
          <p style="color: #666; font-size: 14px;">
            If you didn't request this export, please ignore this email.
          </p>
        </div>
      `,
    };

    await sendEmail(options);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const sendDataExportFailedEmail = async (
  to: string,
  username: string,
): Promise<void> => {
  try {
    const options: CreateEmailOptions = {
      to,
      subject: "Data Export Failed",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Data Export Failed</h2>
          <p>Hi ${username},</p>
          <p>Unfortunately, we encountered an error while generating your data export.</p>
          <p>Please try again later or contact support if the problem persists.</p>
        </div>
      `,
    };

    await sendEmail(options);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const sendVerificationEmail = async (
  to: string,
  username: string,
  verificationUrl: string,
): Promise<void> => {
  try {
    const options: CreateEmailOptions = {
      to,
      subject: "Verify Your Email Address",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to rawfeed.social!</h2>
          <p>Hi ${username},</p>
          <p>Thank you for creating an account. Please verify your email address to get started.</p>
          <p style="margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #000000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email Address
            </a>
          </p>
          <p style="color: #666; font-size: 14px;">
            Or copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #2563eb;">${verificationUrl}</a>
          </p>
          <p style="color: #666; font-size: 14px;">
            <strong>Important:</strong> This verification link will expire in 24 hours.
          </p>
          <p style="color: #666; font-size: 14px;">
            If you didn't create an account on rawfeed.social, please ignore this email.
          </p>
        </div>
      `,
    };

    await sendEmail(options);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const sendPostReportEmail = async (opts: {
  postId: string;
  postUrl: string;
  reason: string;
  explanation: string;
}): Promise<void> => {
  try {
    const { postId, postUrl, reason, explanation } = opts;
    const options: CreateEmailOptions = {
      to: REPORT_RECIPIENT,
      subject: `[Rawfeed] Post Reported — ${reason}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>A post has been reported</h2>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 12px; background: #f3f4f6; font-weight: bold; width: 140px;">Post ID</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${postId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f3f4f6; font-weight: bold;">Reason</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${reason}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f3f4f6; font-weight: bold;">Explanation</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb; white-space: pre-line;">${explanation || "<em>None provided</em>"}</td>
            </tr>
          </table>
          <p>
            <a href="${postUrl}"
               style="background-color: #000000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Post
            </a>
          </p>
        </div>
      `,
    };
    await sendEmail(options);
  } catch (error) {
    logError(error);
    throw error;
  }
};

const formatNotificationLine = (n: NotificationWithTriggers): string => {
  const users = n.triggerUsers;
  let who = "";
  if (users.length === 0) {
    who = "Someone";
  } else if (users.length === 1) {
    who = users[0].name || `@${users[0].username}`;
  } else if (users.length === 2) {
    who = `${users[0].name || `@${users[0].username}`} and ${users[1].name || `@${users[1].username}`}`;
  } else {
    who = `${users[0].name || `@${users[0].username}`} and ${n.count - 1} others`;
  }

  const postLink = n.post_id
    ? ` — <a href="https://rawfeed.social/posts/${n.post_id}">view post</a>`
    : "";
  const replyLink = n.reply_id
    ? ` — <a href="https://rawfeed.social/posts/${n.reply_id}">view reply</a>`
    : postLink;

  switch (n.type) {
    case "Like":
      return `${who} liked your post${postLink}`;
    case "Reshare":
      return `${who} reshared your post${postLink}`;
    case "Follow":
      return `${who} followed you`;
    case "Reply":
      return `${who} replied to your post${replyLink}`;
    case "Mention":
      return `${who} mentioned you in a post${replyLink}`;
    default:
      return `New notification`;
  }
};

export const sendNotificationDigestEmail = async (
  to: string,
  name: string,
  notifications: NotificationWithTriggers[],
): Promise<void> => {
  try {
    const lines = notifications.map(formatNotificationLine);
    const listItems = lines
      .map((line) => `<li style="margin-bottom: 8px;">${line}</li>`)
      .join("");

    const options: CreateEmailOptions = {
      to,
      subject: `You have ${notifications.length} new notification${notifications.length === 1 ? "" : "s"} on rawfeed.social`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your notifications</h2>
          <p>Hi ${name}, here's a summary of your recent activity on rawfeed.social:</p>
          <ul style="padding-left: 20px; margin: 20px 0;">
            ${listItems}
          </ul>
          <p style="margin: 30px 0;">
            <a href="https://rawfeed.social/notifications"
               style="background-color: #000000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View all notifications
            </a>
          </p>
          <p style="color: #666; font-size: 12px;">
            You can change your email notification preferences in your
            <a href="https://rawfeed.social/user/settings/notifications">account settings</a>.
          </p>
        </div>
      `,
    };

    await sendEmail(options);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const sendRssSuggestionReceivedEmail = async (opts: {
  submitterUsername: string;
  submitterEmail: string;
  feedUrl: string;
  language: string;
  isOwner: boolean;
  suggestionId: string;
}): Promise<void> => {
  try {
    const {
      submitterUsername,
      submitterEmail,
      feedUrl,
      language,
      isOwner,
      suggestionId,
    } = opts;
    const adminUrl = `https://rawfeed.social/admin/rss-suggestions/${suggestionId}`;
    const options: CreateEmailOptions = {
      to: REPORT_RECIPIENT,
      subject: `[Rawfeed] New RSS Feed Suggestion from @${submitterUsername}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New RSS Feed Suggestion</h2>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 12px; background: #f3f4f6; font-weight: bold; width: 160px;">Submitted by</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">@${esc(submitterUsername)} (${esc(submitterEmail)})</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f3f4f6; font-weight: bold;">Feed URL</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;"><a href="${safeUrl(feedUrl)}">${esc(feedUrl)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f3f4f6; font-weight: bold;">Language</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(language.toUpperCase())}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f3f4f6; font-weight: bold;">Feed owner?</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${isOwner ? "Yes" : "No"}</td>
            </tr>
          </table>
          <p>
            <a href="${safeUrl(adminUrl)}"
               style="background-color: #000000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Review Suggestion
            </a>
          </p>
        </div>
      `,
    };
    await sendEmail(options);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const sendRssSuggestionAcceptedEmail = async (
  to: string,
  username: string,
  feedName: string,
  feedUrl: string,
): Promise<void> => {
  try {
    const options: CreateEmailOptions = {
      to,
      subject: `[Rawfeed] Your RSS feed suggestion has been accepted!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your RSS Feed Suggestion Was Accepted 🎉</h2>
          <p>Hi @${esc(username)},</p>
          <p>Great news! Your suggestion to add <strong>${esc(feedName)}</strong> has been reviewed and accepted by our moderation team.</p>
          <p style="color: #666; font-size: 14px;">Feed URL: <a href="${safeUrl(feedUrl)}">${esc(feedUrl)}</a></p>
          <p>The feed has been added to <a href="https://rawfeed.social/explore/bots">rawfeed.social/explore/bots</a> and will start syncing shortly.</p>
          <p>Thank you for contributing to Rawfeed!</p>
        </div>
      `,
    };
    await sendEmail(options);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const sendRssSuggestionRejectedEmail = async (
  to: string,
  username: string,
  feedUrl: string,
  reason: string,
): Promise<void> => {
  try {
    const options: CreateEmailOptions = {
      to,
      subject: `[Rawfeed] Your RSS feed suggestion was not accepted`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>RSS Feed Suggestion Not Accepted</h2>
          <p>Hi @${esc(username)},</p>
          <p>Thank you for suggesting an RSS feed. Unfortunately, after review, we were not able to add it to Rawfeed.</p>
          <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 12px; background: #f3f4f6; font-weight: bold; width: 140px;">Feed URL</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;"><a href="${safeUrl(feedUrl)}">${esc(feedUrl)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f3f4f6; font-weight: bold;">Reason</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(reason)}</td>
            </tr>
          </table>
          <p style="color: #666; font-size: 14px;">
            If you believe this decision was made in error or your feed no longer falls into this category,
            you may submit a new suggestion in the future.
          </p>
          <p style="color: #666; font-size: 14px;">
            Questions? Email us at <a href="mailto:hello@rawfeed.social">hello@rawfeed.social</a> or visit <a href="https://rawfeed.social/legal/terms">our policies</a>.
          </p>
        </div>
      `,
    };
    await sendEmail(options);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export default {
  sendDataExportReadyEmail,
  sendDataExportFailedEmail,
  sendVerificationEmail,
  sendPostReportEmail,
  sendNotificationDigestEmail,
  sendRssSuggestionReceivedEmail,
  sendRssSuggestionAcceptedEmail,
  sendRssSuggestionRejectedEmail,
};
