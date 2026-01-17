import { Request, Response } from "express";
import validateInputs from "../utils/validateInputs";
import verifyJWT from "../services/common/verifyJWT";
import jwt from "jsonwebtoken";
import emailVerificationCodes from "../types/emailVerificationCodes";
import getAndRevokeRedisKey, {
  TokenAlreadyUsedError,
  TokenNotFoundError,
} from "../services/common/getAndRevokeRedisKey";
import PasswordResetCode from "../types/PasswordResetCode";
import User from "../../../schemas/User";
import * as argon2 from "argon2";
import handleControllerError from "../utils/handleControllerError";

export const resetPasswordHandler = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    validateInputs(req);

    const token = req.query.token as string;
    const newPassword = req.body.newPassword;
    let decoded: jwt.JwtPayload;

    decoded = verifyJWT(token);
  } catch (error) {
    return handleControllerError(error, res);
  }

  try {
    await getAndRevokeRedisKey(decoded.jti as string);
  } catch (error: any) {
    if (error instanceof TokenAlreadyUsedError) {
      return res.status(409).json({
        code: PasswordResetCode.ALREADY_USED,
      });
    }

    if (error instanceof TokenNotFoundError) {
      return res.status(401).json({
        code: PasswordResetCode.INVALID_TOKEN,
      });
    }

    return res.status(500).json({
      code: "INTERNAL_ERROR",
    });
  }

  await User.findByIdAndUpdate(decoded.userId, {
    password: await argon2.hash(newPassword),
  });

  return res.status(200).json({ message: emailVerificationCodes.SUCCESS });
};
