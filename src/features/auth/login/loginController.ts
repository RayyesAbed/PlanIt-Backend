import { NextFunction, Request, Response } from "express";
import handleControllerError from "../utils/handleControllerError";
import validateInputs from "../utils/validateInputs";
import { toLoginDTO } from "../authDTOMappers";
import loginService from "./loginService";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validateInputs(req);

    const loginDTO = toLoginDTO(req.body);

    const loginToken = await loginService(loginDTO);
  } catch (error) {
    console.error("Error logging user in controller:", error);
    return handleControllerError(error, res);
  }
};

export default loginController;
