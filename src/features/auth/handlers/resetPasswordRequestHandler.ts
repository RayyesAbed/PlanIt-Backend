import { Request, Response } from "express";
import User from "../../../schemas/User";
import signJWT from "../services/common/signJWT";
import { toResetPasswordRequestDTO } from "../authDTOMappers";
import setRedisKey from "../services/common/setRedisKey";
import sendLinkWithEmail from "../utils/sendLinkWithEmail";

const RESPONSE_DELAY_MS = Number(process.env.RESPONSE_DELAY_MS);

export const resetPasswordRequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const confirmedEmail: string = req.body.email;

  try {
    const user = await User.findOne({ confirmedEmail: confirmedEmail });

    if (user) {
      const resetPasswordCredentials = toResetPasswordRequestDTO(user);

      const { verificationToken, jti } = await signJWT(
        resetPasswordCredentials,
        "reset_password",
        user._id
      );

      setRedisKey(jti, "false");

      await sendLinkWithEmail(
        user.name,
        user.confirmedEmail as string,
        user.preferredLanguage,
        "passwordReset",
        verificationToken
      );
    }
  } catch (error) {
    console.error("Reset password request failed: ", error);
  }

  // Prevent enumeration timing attacks by setting artifical delay
  await new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY_MS));

  return res.status(200).json({ code: "SUCCESS" });
};
