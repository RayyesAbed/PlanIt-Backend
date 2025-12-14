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

export const resetPasswordHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    validateInputs(req);
  } catch (error: any) {
    return res.status(400).json({ message: error });
  }

  const token = req.query.token as string;
  const newPassword = req.body.newPassword;
  let decoded: jwt.JwtPayload;

  try {
    decoded = verifyJWT(token);
  } catch (error: any) {
    return res
      .status(401)
      .json({ message: emailVerificationCodes.INVALID_TOKEN });
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

  return res.status(200).json({ message: emailVerificationCodes.SUCCESS });
};
