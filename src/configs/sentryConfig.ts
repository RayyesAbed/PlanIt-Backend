import * as Sentry from "@sentry/node";
import loadSecrets from "./loadSecrets";

const { SENTRY_DSN } = loadSecrets();

const sentryConfig = Sentry.init({
  dsn: SENTRY_DSN,
  sendDefaultPii: true,
});

export default sentryConfig;
