import { NextFunction, Request, Response } from "express";
import handleControllerError from "../../utils/handleControllerError";
import validateInputs from "../../utils/validateInputs";

const resetPasswordActionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    validateInputs(req);

    const token = req.query.token as string;
  } catch (error) {
    return handleControllerError(error, res);
  }
};

export default resetPasswordActionController;
