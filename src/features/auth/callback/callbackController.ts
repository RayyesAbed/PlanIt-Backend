import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";
import callbackService from "./callbackService";
import loadSecrets from "../../../configs/loadSecrets";

const { FRONTEND_URL } = loadSecrets();

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

    const token = callbackService(code, providerType, deviceIPv6);

    return res.redirect(`${FRONTEND_URL}/callback?token=${token}`);
  } catch (error) {
    console.error("Error in OAuth provider:", error);
    return handleControllerError(error, res);
  }
};

export default callbackController;
