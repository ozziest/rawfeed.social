import { logError } from "../helpers/common";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

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

export default {
  sendDataExportReadyEmail,
  sendDataExportFailedEmail,
  sendVerificationEmail,
  sendPostReportEmail,
};
