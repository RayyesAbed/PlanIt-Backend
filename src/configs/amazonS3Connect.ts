import { S3Client } from "@aws-sdk/client-s3";

const AWS_REGION = process.env.AWS_REGION;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;

let cachedS3Client: S3Client | null = null;

const amazonS3Connect = () => {
  if (!AWS_REGION || !AWS_SECRET_ACCESS_KEY || !AWS_ACCESS_KEY_ID) {
    throw new Error("One of Amazon keys is not set!");
  }

  if (cachedS3Client) {
    return cachedS3Client;
  }

  try {
    cachedS3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    return cachedS3Client;
  } catch (error) {
    console.error("Error connecting to Amazon S3:", error);
    return null;
  }
};

export default amazonS3Connect;
