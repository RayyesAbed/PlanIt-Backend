import { NextFunction, Request, Response } from "express";
import handleControllerError from "../../utils/handleControllerError";
import resetPasswordRequestService from "./resetPasswordRequestService";

const resetPasswordRequestController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const confirmedEmail: string = req.body.email;

    await resetPasswordRequestService(confirmedEmail);

    return res.status(200).json({ code: "SUCCESS" });
  } catch (error) {
    console.error("Error resetting user password in controller: ", error);
    return handleControllerError(error, res);
  }
};

export default resetPasswordRequestController;
