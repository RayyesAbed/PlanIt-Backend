import { NextFunction, Request, Response } from "express";
import { toRegisterDTO } from "../authDTOMappers";
import handleControllerError from "../utils/handleControllerError";

const registerController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const registerCredentialsDTO = toRegisterDTO(req.body);
    const deviceIPv6 = req.ip;
    if (!deviceIPv6) throw new Error("Device IP not found");
  } catch (error) {
    console.error("Error registering user in controller:", error);
    return handleControllerError(error, res);
  }
};

export default registerController;
