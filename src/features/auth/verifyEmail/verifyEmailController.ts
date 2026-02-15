import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";
import verifyEmailService from "./verifyEmailService";

const verifyEmailController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.query.token as string;
    verifyEmailService(token);
  } catch (error) {
    return handleControllerError(error, res);
  }
};

export default verifyEmailController;
