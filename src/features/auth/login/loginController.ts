import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";
import validateInputs from "../utils/validateInputs";
import { toLoginDTO } from "../authDTOMappers";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validateInputs(req);

    const loginDTO = toLoginDTO(req.body);
  } catch (error) {
    console.error("Error logging user in controller:", error);
    return handleControllerError(error, res);
  }
};

export default loginController;
