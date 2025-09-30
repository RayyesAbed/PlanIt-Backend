import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../../schemas/User";
import loadAwsSecrets from "../../../configs/loadAwsSecrets";

export const verifyUserEmailHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Load the JWT Secret
  const { JWT_SECRET } = await loadAwsSecrets();

  // Get the token from the request and cast it to string
  const token = req.query.token as string;

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (typeof payload === "string") {
      return res.status(400).json({ message: "Invalid token format" });
    }

    // If JWT token format is valid, then get the user Id
    const userId = payload.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user confirmed email and to be confirmed email
    await user?.updateOne({
      confirmedEmail: user.toBeConfirmedEmail,
      toBeConfirmedEmail: "",
    });

    // TODO: Create a User Tasks document after successfully creating the user document

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
