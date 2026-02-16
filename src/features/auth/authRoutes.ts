import { Router } from "express";
import {
  loginValidator,
  registerRequestValidator,
  resetPasswordValidator,
} from "./authValidators";
import {
  loginRateLimiter,
  registerRateLimiter,
  resetPasswordRequestLimiter,
} from "./authLimiter";
import rejectNestedObjects from "../../middlewares/rejectNestedObjects";
import { resetPasswordRequestHandler } from "./handlers/resetPasswordRequestHandler";
import { resetPasswordHandler } from "./handlers/resetPasswordHandler";
import { logoutUserHandler } from "./handlers/logoutUserHandler";
import registerController from "./register/registerController";
import verifyEmailController from "./verifyEmail/verifyEmailController";
import loginController from "./login/loginController";

const authRoutes = Router();

authRoutes.post(
  "/register_request",
  registerRateLimiter,
  registerRequestValidator,
  rejectNestedObjects,
  registerController,
);

authRoutes.post("/verify-email", verifyEmailController);

authRoutes.post(
  "/login",
  loginRateLimiter,
  loginValidator,
  rejectNestedObjects,
  loginController,
);

authRoutes.post(
  "/reset-password-request",
  resetPasswordRequestLimiter,
  resetPasswordRequestHandler,
);

authRoutes.patch(
  "/reset-password",
  resetPasswordValidator,
  resetPasswordHandler,
);

authRoutes.post("/logout", logoutUserHandler);

export default authRoutes;
