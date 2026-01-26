import { randomUUID } from "crypto";
import { Request, Response } from "express";
import User from "../../../schemas/User";
import { validationResult } from "express-validator";
import { toLoginDTO } from "../authDTOMappers";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import loadSecrets from "../../../configs/loadSecrets";
import enLoginStatus from "../types/enLoginStatus";
import validateInputs from "../utils/validateInputs";

export const loginUserEmailHandler = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { JWT_SECRET } = loadSecrets();
  try {
    validateInputs(req);

    const email = req.body.email;
    const password = req.body.password;

    // Find user either by email attribute in MongoDB, and only return the object with lean()

    const existingUser = await User.findOne({
      confirmedEmail: email,
    }).lean();

    if (existingUser) {
      const doPasswordsMatch = await argon2.verify(
        existingUser.password,
        password,
      );

      if (doPasswordsMatch) {
        const loginToken = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
          expiresIn: "1h",
          jwtid: randomUUID(),
        });

        res.cookie("login", loginToken, { httpOnly: true, sameSite: "strict" });

        return res
          .status(200)
          .json({ code: enLoginStatus.LOGIN_SUCCESSFUL, token: loginToken });
      }
    }

    return res
      .status(401)
      .json({ code: enLoginStatus.INCORRECT_EMAIL_PASSWORD });
  } catch (error) {
    console.error("Error while logging the user in the handler:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
