import { Router } from "express";
import { registerUserRequestHandler } from "./handlers/registerUserHandler";
import { registerRequestValidator } from "./authValidators";
import { registerRateLimiter } from "./authLimiter";
import rejectNestedObjects from "../../middlewares/rejectNestedObjects";

const authRoutes = Router();

authRoutes.post(
  "/register_request",
  registerRateLimiter,
  registerRequestValidator,
  rejectNestedObjects,
  registerUserRequestHandler
);

export default authRoutes;
