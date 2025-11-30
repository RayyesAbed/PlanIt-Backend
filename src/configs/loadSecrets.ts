import AppSecrets from "../types/AppSecrets";

function assertEnv(varName: string): string {
  const value = process.env[varName];
  if (!value) throw new Error(`Missing environment variable: ${varName}`);
  return value;
}

/**
 * Loads and parses secrets from .env file.
 * @returns {AppSecrets} Parsed secret values.
 */
const loadSecrets = (): AppSecrets => {
  return {
    MONGODB_URI: assertEnv("MONGODB_URI"),
    GEMINI_API_KEY: assertEnv("GEMINI_API_KEY"),
    AWS_S3_BUCKET: assertEnv("AWS_S3_BUCKET"),
    AWS_REGION: assertEnv("AWS_REGION"),
    GMAIL_USER: assertEnv("GMAIL_USER"),
    GMAIL_PASSWORD: assertEnv("GMAIL_PASSWORD"),
    JWT_SECRET: assertEnv("JWT_SECRET"),
  };
};

export default loadSecrets;
