import { randomUUID } from "crypto";
import { Request, Response } from "express";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../../../schemas/User";
import { toRegisterDTO } from "../authDTOMappers";
import sendEmail from "../../../configs/nodemailer";
import registerVerifyTemplate from "../emailTemplates/registerVerifyTemplate";
import { getEnvVariables } from "../../../configs/enviromentVariables";

export const registerUserRequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { JWT_SECRET, VITE_FRONTEND_URL } = getEnvVariables();

  try {
    // Get the validation result from the validator middleware assigned to the /register_request endpoint

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no validation errors, then proceed

    const registerCredentialsDTO = toRegisterDTO(req.body);

    // Find user either by 'confirmedEmail' or 'toBeConfirmedEmail' attributes in MongoDB

    const existingUser = await User.findOne({
      $or: [
        { confirmedEmail: registerCredentialsDTO.toBeConfirmedEmail },
        { toBeConfirmedEmail: registerCredentialsDTO.toBeConfirmedEmail },
      ],
    });

    if (!existingUser) {
      const hashedPassword = await argon2.hash(registerCredentialsDTO.password);

      const newUser = await User.create({
        name: registerCredentialsDTO.name,
        toBeConfirmedEmail: registerCredentialsDTO.toBeConfirmedEmail,
        password: hashedPassword,
      });

      const verificationToken = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
        expiresIn: "1h",
        jwtid: randomUUID(),
      });

      const verificationURL = `${VITE_FRONTEND_URL}?email-token-verify=${verificationToken}`;

      await sendEmail(
        registerCredentialsDTO.toBeConfirmedEmail,
        "PlanIt Account Creation",
        registerVerifyTemplate(registerCredentialsDTO.name, verificationURL)
      );
    }

    return res.status(200).json({
      message: "If this is your first time, we've sent a verification email.",
    });
  } catch (error) {
    console.error("Error registering user in controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
