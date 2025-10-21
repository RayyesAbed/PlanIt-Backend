import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../../schemas/User";
import { toRegisterDTO } from "../authDTOMappers";
import sendVerificationEmail from "../utils/sendVerificationEmail";
import createNewUser from "../services/register/createNewUser";
import signJWT from "../services/common/signJWT";
import supportedLanguages from "../../../resources/languages/supportedLanguages";

export const registerUserRequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Get the validation result from the validator middleware assigned to the /register_request endpoint

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no validation errors, then proceed

    const deviceIPv6 = req.ip; // Express req returns IPv6 representation

    if (!deviceIPv6) throw new Error("Device IP not found");

    const deviceIPv4 = deviceIPv6.substring(7);

    const registerCredentialsDTO = toRegisterDTO(req.body);

    if (
      !supportedLanguages.includes(registerCredentialsDTO.preferredLanguage)
    ) {
      throw new Error("Preferred language currently not supported");
    }

    // Find user either by 'confirmedEmail' or 'toBeConfirmedEmail' attributes in MongoDB

    const existingUser = await User.findOne({
      $or: [
        { confirmedEmail: registerCredentialsDTO.toBeConfirmedEmail },
        { toBeConfirmedEmail: registerCredentialsDTO.toBeConfirmedEmail },
      ],
    });

    if (!existingUser) {
      const newUser = await createNewUser(registerCredentialsDTO, deviceIPv4);

      const verificationToken = await signJWT(
        registerCredentialsDTO,
        "register_user",
        newUser._id
      );

      await sendVerificationEmail(
        newUser.name,
        newUser.toBeConfirmedEmail!,
        newUser.preferredLanguage,
        verificationToken
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
