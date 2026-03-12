import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

import express from "express";
import cors from "cors";

import authRoutes from "./src/features/auth/authRoutes";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

export default app;
