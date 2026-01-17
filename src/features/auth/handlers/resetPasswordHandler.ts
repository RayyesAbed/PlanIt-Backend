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

    await getAndRevokeRedisKey(decoded.jti as string);

    await User.findByIdAndUpdate(decoded.userId, {
      password: await argon2.hash(newPassword),
    });
  } catch (error) {
    return handleControllerError(error, res);
  }

  return res.status(200).json({ message: emailVerificationCodes.SUCCESS });
};
