import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    console.error("Error logging user in controller:", error);
    return handleControllerError(error, res);
  }
};

export default loginController;
