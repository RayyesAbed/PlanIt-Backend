import { randomUUID } from "crypto";
import { Request, Response } from "express";
import User from "../../../schemas/User";
import { validationResult } from "express-validator";
import { toLoginDTO } from "../authDTOMappers";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import loadSecrets from "../../../configs/loadSecrets";

export const loginUserEmailHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { JWT_SECRET } = loadSecrets();
  try {
    // Get the validation result from the validator middleware assigned to the /login endpoint

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no validation errors, then proceed

    let loginCredentialsDTO = toLoginDTO(req.body);

    // Find user either by email attribute in MongoDB, and only return the object with lean()

    const existingUser = await User.findOne({
      confirmedEmail: loginCredentialsDTO.email,
    }).lean();

    if (existingUser) {
      const doPasswordsMatch = await argon2.verify(
        existingUser.password,
        loginCredentialsDTO.password
      );

      if (doPasswordsMatch) {
        const loginToken = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
          expiresIn: "1h",
          jwtid: randomUUID(),
        });

        res.cookie("login", loginToken, { httpOnly: true, sameSite: "strict" });

        return res
          .status(200)
          .json({ message: "logged in successfully", token: loginToken });
      }
    }

    return res
      .status(401)
      .json({ message: "Incorrect email, password, or both" });
  } catch (error) {
    console.error("Error while logging the user in the handler:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
