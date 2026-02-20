import { NextFunction, Request, Response } from "express";
import handleControllerError from "../../utils/handleControllerError";

const resetPasswordRequestController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
  } catch (error) {
    console.error("Error resetting user password in controller: ", error);
    return handleControllerError(error, res);
  }
};

export default resetPasswordRequestController;
