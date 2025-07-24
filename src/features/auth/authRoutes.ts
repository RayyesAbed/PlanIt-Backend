import { Router } from "express";
import { registerUserRequestHandler } from "./handlers/registerUserHandler";
import { registerRequestValidator } from "./authValidators";
import { registerRateLimiter } from "./authLimiter";

const authRoutes = Router();

authRoutes.post(
  "/register_request",
  registerRateLimiter,
  registerRequestValidator,
  registerUserRequestHandler
);

export default authRoutes;
