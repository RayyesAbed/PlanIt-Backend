import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";
import callbackService from "./callbackService";

const callbackController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const providerType = req.params.providerType;
    const code = req.query.code as string;

    const deviceIPv6 = req.ip;

    if (!deviceIPv6) throw new Error("Device IP not found");

    if (!code) return res.status(400).send("No code provided");

    callbackService(code, providerType, deviceIPv6);
  } catch (error) {
    console.error("Error in OAuth provider:", error);
    return handleControllerError(error, res);
  }
};

export default callbackController;
