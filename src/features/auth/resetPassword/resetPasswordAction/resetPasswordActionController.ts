import { NextFunction, Request, Response } from "express";
import handleControllerError from "../../utils/handleControllerError";
import validateInputs from "../../utils/validateInputs";
import resetPasswordActionService from "./resetPasswordActionService";

const resetPasswordActionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    validateInputs(req);

    const token = req.query.token as string;
    const newPassword = req.body.newPassword;

    await resetPasswordActionService(token, newPassword);

    return res.status(200).json({ code: "PASSWORD_RESET_SUCCESSUL" });
  } catch (error) {
    return handleControllerError(error, res);
  }
};

export default resetPasswordActionController;
