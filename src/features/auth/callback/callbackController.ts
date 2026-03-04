import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";

const callbackController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
  } catch (error) {
    console.error("Error in OAuth provider:", error);
    return handleControllerError(error, res);
  }
};

export default callbackController;
