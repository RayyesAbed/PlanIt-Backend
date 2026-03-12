import loadSecrets from "./src/configs/loadSecrets";
import app from "./app";
import { redisConnect } from "./src/configs/redis";
import mongooseConnect from "./src/configs/mongooseConnect";
import deleteUnverifiedEmails from "./src/jobs/deleteUnverifiedEmails";
import { initGeoLite } from "./src/configs/geolite";
import seedSubscriptions from "./src/seed/seedSubscriptions";
import sentryConfig from "./src/configs/sentryConfig";
import * as Sentry from "@sentry/node";

const launchBackendServer = async () => {
  loadSecrets();

  redisConnect();

  await initGeoLite();

  await mongooseConnect();

  await seedSubscriptions();

  await deleteUnverifiedEmails.start();

  Sentry.setupExpressErrorHandler(app);

  app.listen(3000);
};

launchBackendServer();
