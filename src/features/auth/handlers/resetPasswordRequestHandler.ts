import { Request, Response } from "express";
import User from "../../../schemas/User";

export const resetPasswordRequestHandler = async (
  req: Request,
  res: Response
) => {
  const confirmedEmail: string = req.body.email;

  const user = await User.findOne({ confirmedEmail: confirmedEmail });
};
