import { Request, Response } from "express";
import getCookie from "../utils/getCookie";
import verifyJWT from "../services/common/verifyJWT";
import getAndRevokeRedisKey from "../services/common/getAndRevokeRedisKey";

export const logoutUserHandler = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const token = getCookie(req, "login")!;

    const payload = verifyJWT(token);

    await getAndRevokeRedisKey(payload.jti as string);
  } catch (error) {}
};
