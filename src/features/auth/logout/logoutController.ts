import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";
import getCookie from "../utils/getCookie";

const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const token = getCookie(req, "login");
  } catch (error) {
    console.error("Error  logging out users in controller:", error);
    handleControllerError(error, res);
  }
};

export default logoutController;
