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
    FRONTEND_URL: assertEnv("FRONTEND_URL"),
    MONGODB_URI: assertEnv("MONGODB_URI"),
    GEMINI_API_KEY: assertEnv("GEMINI_API_KEY"),
    AWS_S3_BUCKET: assertEnv("AWS_S3_BUCKET"),
    AWS_REGION: assertEnv("AWS_REGION"),
    GMAIL_USER: assertEnv("GMAIL_USER"),
    GMAIL_PASSWORD: assertEnv("GMAIL_PASSWORD"),
    FAKE_USER_EMAIL: assertEnv("FAKE_USER_EMAIL"),
    JWT_SECRET: assertEnv("JWT_SECRET"),
    REDIS_HOST: assertEnv("REDIS_HOST"),
    REDIS_USERNAME: assertEnv("REDIS_USERNAME"),
    REDIS_PASSWORD: assertEnv("REDIS_PASSWORD"),
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_DB: Number(process.env.REDIS_DB),
    REDIS_MAX_RETRIES_PER_REQUEST: Number(
      process.env.REDIS_MAX_RETRIES_PER_REQUEST,
    ),
    SENTRY_DSN: assertEnv("SENTRY_DSN"),
    GOOGLE_OAUTH_CLIENT_ID: assertEnv("GOOGLE_OAUTH_CLIENT_ID"),
    GOOGLE_OAUTH_REDIRECT_URI: assertEnv("GOOGLE_OAUTH_REDIRECT_URI"),
    GOOGLE_OAUTH_CLIENT_SECRET: assertEnv("GOOGLE_OAUTH_CLIENT_SECRET"),
    EXPRESS_SESSION_SECRET: assertEnv("EXPRESS_SESSION_SECRET"),
  };
};

export default loadSecrets;
