import { Request, Response } from "express";
import User from "../../../schemas/User";
import getAndRevokeRedisKey from "../services/common/getAndRevokeRedisKey";
import emailVerificationCodes from "../types/emailVerificationCodes";
import verifyJWT from "../services/common/verifyJWT";

export const verifyUserEmailHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const token = req.query.token as string;

  try {
    const payload = verifyJWT(token);

    await getAndRevokeRedisKey(payload.jti ?? "");

    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user?.updateOne({
      confirmedEmail: user.toBeConfirmedEmail,
      toBeConfirmedEmail: "",
    });

    // TODO: Create a User Tasks document after successfully creating the user document

    return res.status(200).json({
      code: emailVerificationCodes.SUCCESS,
    });
  } catch (error: any) {
    return res.status(401).json({ code: error.message });
  }
};
