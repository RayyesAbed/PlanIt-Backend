// First load the environment variables
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

// Then import modules and functions
import express from "express";
import mongooseConnect from "./src/configs/mongooseConnect";

const app = express();

const launchBackendServer = async () => {
  await mongooseConnect();
  app.listen(3000);
};

launchBackendServer();
