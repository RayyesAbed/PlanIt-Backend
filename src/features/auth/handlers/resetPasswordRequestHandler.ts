import { Request, Response } from "express";

export const resetPasswordRequestHandler = (req: Request, res: Response) => {
  const email: string = req.body.email;
};
