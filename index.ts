// First load the environment variables
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

// Then import modules and functions
import express from "express";
import cors from "cors";
import mongooseConnect from "./src/configs/mongooseConnect";
import authRoutes from "./src/features/auth/authRoutes";

const app = express();

const launchBackendServer = async () => {
  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  );

  await mongooseConnect();
  app.use("/auth", authRoutes);
  app.listen(3000);
};

launchBackendServer();
