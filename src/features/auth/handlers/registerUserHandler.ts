import { Request, Response } from "express";
import User from "../../../schemas/User";
import { toRegisterDTO } from "../authDTOMappers";
import sendLinkWithEmail from "../utils/sendLinkWithEmail";
import createNewUser from "../services/register/createNewUser";
import signJWT from "../services/common/signJWT";
import setRedisKey from "../services/common/setRedisKey";
import validateInputs from "../utils/validateInputs";
import checkSupportedLanguage from "../utils/checkSupportedLanguage";
import handleControllerError from "../utils/handleControllerError";

export const registerUserRequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    validateInputs(req);

    const deviceIPv6 = req.ip; // Express req returns IPv6 representation

    if (!deviceIPv6) throw new Error("Device IP not found");

    const registerCredentialsDTO = toRegisterDTO(req.body);

    checkSupportedLanguage(registerCredentialsDTO.preferredLanguage);

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

    return res.status(201).json({
      message: "ACCOUNT_CREATED_AWAITING_VERIFICATION",
    });
  } catch (error) {
    console.error("Error registering user in controller:", error);
    return handleControllerError(error, res);
  }
};
