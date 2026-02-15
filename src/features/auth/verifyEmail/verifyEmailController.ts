import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";
import verifyEmailService from "./verifyEmailService";
import emailVerificationCodes from "../types/emailVerificationCodes";

const verifyEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const token = req.query.token as string;

    await verifyEmailService(token);

    return res.status(200).json({
      code: emailVerificationCodes.SUCCESS,
    });
  } catch (error) {
    return handleControllerError(error, res);
  }
};

export default verifyEmailController;
