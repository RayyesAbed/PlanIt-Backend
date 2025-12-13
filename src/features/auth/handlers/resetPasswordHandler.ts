import { Request, Response } from "express";
import validateInputs from "../utils/validateInputs";
import verifyJWT from "../services/common/verifyJWT";
import jwt from "jsonwebtoken";
import emailVerificationCodes from "../../../types/emailVerificationCodes";

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
};
