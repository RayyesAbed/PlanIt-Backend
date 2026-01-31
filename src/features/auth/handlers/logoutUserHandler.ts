import { Request, Response } from "express";
import getCookie from "../utils/getCookie";
import verifyJWT from "../services/common/verifyJWT";

export const logoutUserHandler = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const token = getCookie(req, "login")!;

    const payload = verifyJWT(token);
  } catch (error) {}
};
