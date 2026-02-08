import { body } from "express-validator";
import rejectDangerousCharacters from "./utils/rejectDangerousCharacters";
import rejectEmailInjection from "./utils/rejectEmailInjection";

export const registerRequestValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^\p{L}+$/u)
    .withMessage("Name must be alphanumeric")
    .custom(rejectDangerousCharacters),

  body("toBeConfirmedEmail")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .custom(rejectEmailInjection),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain a special character")
    .custom(rejectDangerousCharacters),
];

export const loginValidator = [
  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const resetPasswordValidator = [
  body("newPassword")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain a special character")
    .custom(rejectDangerousCharacters),
];
