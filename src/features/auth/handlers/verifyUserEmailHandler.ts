import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../../schemas/User";
import loadSecrets from "../../../configs/loadSecrets";
import getAndRevokeRedisKey from "../services/common/getAndRevokeRedisKey";
import emailVerificationCodes from "../../../types/emailVerificationCodes";

const { JWT_SECRET } = loadSecrets();

export const verifyUserEmailHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(400).json({ code: emailVerificationCodes.INVALID_TOKEN });
  }

  let payload: any;

  try {
    payload = jwt.verify(token, JWT_SECRET);

    if (typeof payload === "string") {
      return res
        .status(400)
        .json({ code: emailVerificationCodes.INVALID_TOKEN });
    }
  } catch (error: any) {
    return res.status(401).json({ code: emailVerificationCodes.INVALID_TOKEN });
  }

  try {
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
