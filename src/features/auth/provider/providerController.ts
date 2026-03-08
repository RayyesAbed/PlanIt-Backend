import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";
import providerService from "./providerService";

const providerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const providerType = req.params.providerType;

    let OAuthLink = (await providerService(providerType)) as string;

    return res.redirect(OAuthLink);
  } catch (error) {
    console.error("Error in OAuth provider:", error);
    return handleControllerError(error, res);
  }
};

export default providerController;
