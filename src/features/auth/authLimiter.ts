import { rateLimit } from "express-rate-limit";

export const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // Per 1 hour
  limit: 5, // Only 5 possible register attempts per 1 hour
  message: "Too many register attempts! Please try again later",
});

export const loginRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // Per 1 hour
  limit: 3, // Only 3 possible login attempts per 1 hour
  message: "Too many login attempts! Please try again later",
});

export const resetPasswordRequestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 3,
  message: "Too many password reset attempts! Please try again later",
});
