type AppSecrets = {
  MONGODB_URI: string;
  GEMINI_API_KEY: string;
  AWS_S3_BUCKET: string;
  AWS_REGION: string;
  GMAIL_USER: string;
  GMAIL_PASSWORD: string;
  FAKE_USER_EMAIL: string;
  JWT_SECRET: string;
  REDIS_HOST: string;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  REDIS_DB: number;
  REDIS_MAX_RETRIES_PER_REQUEST: number;
  SENTRY_DSN: string;
  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_REDIRECT_URI: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;
};

export default AppSecrets;
