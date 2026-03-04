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
import registerController from "./register/registerController";
import verifyEmailController from "./verifyEmail/verifyEmailController";
import loginController from "./login/loginController";
import logoutController from "./logout/logoutController";
import resetPasswordRequestController from "./resetPassword/resetPasswordRequest/resetPasswordRequestController";
import resetPasswordActionController from "./resetPassword/resetPasswordAction/resetPasswordActionController";
import providerController from "./provider/providerController";
import callbackController from "./callback/callbackController";

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
  resetPasswordRequestController,
);

authRoutes.patch(
  "/reset-password",
  resetPasswordValidator,
  resetPasswordActionController,
);

authRoutes.post("/logout", logoutController);

authRoutes.get("/provider/:providerType", providerController);

authRoutes.get("/callback/:providerType", callbackController);

export default authRoutes;
