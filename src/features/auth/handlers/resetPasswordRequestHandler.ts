import { Request, Response } from "express";
import User from "../../../schemas/User";

export const resetPasswordRequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const confirmedEmail: string = req.body.email;

  const user = await User.findOne({ confirmedEmail: confirmedEmail });

  if (user) {
  }

  return res.status(200).json({ code: "SUCCESS" });
};
