import { Request, Response } from "express";
import getCookie from "../utils/getCookie";
import verifyJWT from "../services/common/verifyJWT";
import getAndRevokeRedisKey from "../services/common/getAndRevokeRedisKey";
import handleControllerError from "../utils/handleControllerError";
import enLogoutStatus from "../types/enLogoutStatus";

export const logoutUserHandler = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const token = getCookie(req, "login")!;

    const payload = verifyJWT(token);

    await getAndRevokeRedisKey(payload.jti as string);

    res.clearCookie("login");

    return res.status(200).json({ code: enLogoutStatus.SUCCESS });
  } catch (error) {
    console.error("Error while logging out the user in the handler:", error);
    handleControllerError(error, res);
  }
};
