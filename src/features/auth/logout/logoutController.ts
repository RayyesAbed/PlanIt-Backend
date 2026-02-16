import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";

const logoutController = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    console.error("Error  logging out users in controller:", error);
    handleControllerError(error, res);
  }
};

export default logoutController;
