import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";
import getCookie from "../utils/getCookie";
import enLogoutStatus from "../types/enLogoutStatus";
import logoutService from "./logoutService";

const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const token = getCookie(req, "login");

    if (!token) return res.status(200).json({ code: enLogoutStatus.SUCCESS });

    await logoutService(token);
  } catch (error) {
    console.error("Error  logging out users in controller:", error);
    handleControllerError(error, res);
  }
};

export default logoutController;
