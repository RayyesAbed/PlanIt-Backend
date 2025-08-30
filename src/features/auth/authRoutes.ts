import { Router } from "express";
import { registerUserRequestHandler } from "./handlers/registerUserHandler";
import { loginValidator, registerRequestValidator } from "./authValidators";
import { loginRateLimiter, registerRateLimiter } from "./authLimiter";
import rejectNestedObjects from "../../middlewares/rejectNestedObjects";
import { loginUserEmailHandler } from "./handlers/loginUserEmailHandler";

const authRoutes = Router();

authRoutes.post(
  "/register_request",
  registerRateLimiter,
  registerRequestValidator,
  rejectNestedObjects,
  registerUserRequestHandler
);

authRoutes.post(
  "/login",
  loginRateLimiter,
  loginValidator,
  rejectNestedObjects,
  loginUserEmailHandler
);

export default authRoutes;
