import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../../schemas/User";
import { toRegisterDTO } from "../authDTOMappers";
import sendLinkWithEmail from "../utils/sendLinkWithEmail";
import createNewUser from "../services/register/createNewUser";
import signJWT from "../services/common/signJWT";
import supportedLanguages from "../../../resources/languages/supportedLanguages";
import setRedisKey from "../services/common/setRedisKey";
import validateInputs from "../utils/validateInputs";

export const registerUserRequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    validateInputs(req);

    const deviceIPv6 = req.ip; // Express req returns IPv6 representation

    if (!deviceIPv6) throw new Error("Device IP not found");

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
      const newUser = await createNewUser(registerCredentialsDTO, deviceIPv6);

      const { verificationToken, jti } = await signJWT(
        registerCredentialsDTO,
        "register_user",
        newUser._id
      );

      setRedisKey(jti, "false");

      await sendLinkWithEmail(
        newUser.name,
        newUser.toBeConfirmedEmail!,
        newUser.preferredLanguage,
        "emailVerify",
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
