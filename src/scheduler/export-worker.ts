import { Cron } from "croner";
import AdmZip from "adm-zip";
import dataExportService from "../services/dataExport.service";
import userService from "../services/user.service";
import postService from "../services/post.service";
import s3Service from "../services/s3.service";
import emailService from "../services/email.service";
import { logError } from "../helpers/common";
import { sanitizePostsForExport } from "../helpers/dataHelpers";

const processExport = async (exportId: string) => {
  try {
    const exportRecord = await dataExportService.getById(exportId);
    if (!exportRecord) {
      console.error(`[Export Worker] Export ${exportId} not found`);
      return;
    }

    // Mark as processing
    await dataExportService.update(exportId, {
      status: "processing",
    });

    const user = await userService.getById(exportRecord.user_id);
    if (!user) {
      throw new Error("User not found");
    }

    // Fetch all user data
    const posts = await postService.getAllByUser(user.id);
    const sanitizedPosts = sanitizePostsForExport(posts);

    // Create complete data archive
    const completeData = {
      profile: {
        id: user.id,
        username: user.username,
        name: user.name,
        bio: user.bio,
        email: user.email,
        custom_domain: user.custom_domain,
        domain_verification_status: user.domain_verification_status,
        domain_verified_at: user.domain_verified_at,
        bot_type: user.bot_type,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      posts: sanitizedPosts,
      export_date: new Date().toISOString(),
      total_posts: posts.length,
    };

    // Convert to JSON
    const jsonData = JSON.stringify(completeData, null, 2);

    // Create ZIP file
    const zip = new AdmZip();
    zip.addFile("export.json", Buffer.from(jsonData, "utf8"));
    const compressedData = zip.toBuffer();
    const fileSize = compressedData.length;

    // Upload compressed file to S3 (let S3 handle content-type)
    const s3Key = `exports/${user.id}/${exportId}.zip`;
    await s3Service.uploadToS3(s3Key, compressedData);

    // Calculate expiration (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Update export record
    await dataExportService.update(exportId, {
      status: "completed",
      completed_at: new Date(),
      expires_at: expiresAt,
      s3_key: s3Key,
      file_size: fileSize,
    });

    // Generate download URL for email
    const downloadUrl = `${process.env.APP_URL!}/user/settings/data-extraction/${exportId}/download`;

    // Send email notification
    await emailService.sendDataExportReadyEmail(
      user.email,
      user.username,
      downloadUrl,
    );

    console.log(
      `[Export Worker] Successfully processed export ${exportId} for user ${user.username}`,
    );
  } catch (error) {
    console.error(
      `[Export Worker] Error processing export ${exportId}:`,
      error,
    );

    // Mark as failed
    await dataExportService.update(exportId, {
      status: "failed",
      completed_at: new Date(),
      error_message: (error as Error).message,
    });

    // Try to send failure email
    try {
      const exportRecord = await dataExportService.getById(exportId);
      if (exportRecord) {
        const user = await userService.getById(exportRecord.user_id);
        if (user) {
          await emailService.sendDataExportFailedEmail(
            user.email,
            user.username,
          );
        }
      }
    } catch (emailError) {
      logError(emailError as Error);
    }

    logError(error as Error, {
      tags: { module: "export-worker", exportId },
    });
  }
};

export async function initializeExportWorker() {
  // Run every minute to check for pending exports
  new Cron("*/1 * * * *", async () => {
    try {
      const pendingExports = await dataExportService.getPendingExports();

      // Process only one export at a time to avoid resource overload
      if (pendingExports.length > 0) {
        await processExport(pendingExports[0].id);
      }
    } catch (error) {
      logError(error as Error, {
        tags: { module: "export-worker", action: "poll_pending_exports" },
      });
    }
  });

  console.log(
    "[Export Worker] Initialized - checking for pending exports every minute",
  );
}
