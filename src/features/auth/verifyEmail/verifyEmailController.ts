import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";

const verifyEmailController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    return handleControllerError(error, res);
  }
};

export default verifyEmailController;
