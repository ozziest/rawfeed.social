import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_DATA_EXPORTS!;

export const uploadToS3 = async (
  key: string,
  data: Buffer | string,
): Promise<void> => {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: data,
  });

  await s3Client.send(command);
};

export const generatePresignedUrl = async (
  key: string,
  expiresIn: number = 3600, // 1 hour default
  filename: string,
  responseContentType?: string,
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${filename}"`,
    ...(responseContentType && { ResponseContentType: responseContentType }),
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
};

export default {
  uploadToS3,
  generatePresignedUrl,
};
