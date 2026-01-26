import { Request, Response } from "express";
import User from "../../../schemas/User";
import { toLoginDTO } from "../authDTOMappers";
import * as argon2 from "argon2";
import enLoginStatus from "../types/enLoginStatus";
import validateInputs from "../utils/validateInputs";
import signJWT from "../services/common/signJWT";

export const loginUserEmailHandler = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    validateInputs(req);

    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({
      confirmedEmail: email,
    }).lean();

    if (existingUser) {
      const loginCredentialsDTO = toLoginDTO(existingUser);

      const doPasswordsMatch = await argon2.verify(
        loginCredentialsDTO.password,
        password,
      );

      if (doPasswordsMatch) {
        const loginToken = await signJWT(
          loginCredentialsDTO,
          "login",
          existingUser._id,
        );

        res.cookie("login", loginToken.verificationToken, {
          httpOnly: true,
          sameSite: "strict",
        });

        return res.status(200).json({ code: enLoginStatus.LOGIN_SUCCESSFUL });
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
