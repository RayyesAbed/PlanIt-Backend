import { Request, Response } from "express";
import validateInputs from "../utils/validateInputs";

export const resetPasswordHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    validateInputs(req);
  } catch (error: any) {
    return res.status(400).json({ message: error });
  }
};
