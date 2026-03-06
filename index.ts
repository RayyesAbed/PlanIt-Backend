// First load the environment variables
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

// Then import modules and functions
import express from "express";
import sentryConfig from "./src/configs/sentryConfig";
import * as Sentry from "@sentry/node";
import cors from "cors";
import mongooseConnect from "./src/configs/mongooseConnect";
import authRoutes from "./src/features/auth/authRoutes";
import deleteUnverifiedEmails from "./src/jobs/deleteUnverifiedEmails";
import { initGeoLite } from "./src/configs/geolite";
import seedSubscriptions from "./src/seed/seedSubscriptions";
import loadSecrets from "./src/configs/loadSecrets";
import { redisConnect } from "./src/configs/redis";
import session from "express-session";

const app = express();

const { EXPRESS_SESSION_SECRET } = loadSecrets();

const launchBackendServer = async () => {
  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    }),
  );

  app.use(
    session({
      secret: EXPRESS_SESSION_SECRET,
      resave: false,
    }),
  );

  loadSecrets();

  redisConnect();

  await initGeoLite();

  await mongooseConnect();

  await seedSubscriptions();

  await deleteUnverifiedEmails.start();

  app.use("/auth", authRoutes);

  Sentry.setupExpressErrorHandler(app);

  app.listen(3000);
};

launchBackendServer();
