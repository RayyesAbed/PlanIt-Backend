import { rateLimit } from "express-rate-limit";

export const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // Per 1 hour
  limit: 5, // Only 5 possible register attempts per 1 hour
  message: "Too many register attempts! Please try again later",
});
