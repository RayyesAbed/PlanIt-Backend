import { NextFunction, Request, Response } from "express";
import handleControllerError from "../../utils/handleControllerError";

const resetPasswordActionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
  } catch (error) {
    return handleControllerError(error, res);
  }
};

export default resetPasswordActionController;
