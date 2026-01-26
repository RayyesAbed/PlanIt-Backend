import jwt from "jsonwebtoken";
import {
  LoginDTO,
  RegisterRequestDTO,
  ResetPasswordRequestDTO,
} from "../../authDTOs";
import loadSecrets from "../../../../configs/loadSecrets";
import { randomUUID } from "crypto";
import { Types } from "mongoose";

const signJWT = (
  credentialsDTO: RegisterRequestDTO | ResetPasswordRequestDTO | LoginDTO,
  jwtSignPurpose: string,
  userId: Types.ObjectId,
) => {
  try {
    const jti = randomUUID();

    const { JWT_SECRET } = loadSecrets();
    const token = jwt.sign(
      {
        userId: userId,
        lang: credentialsDTO.preferredLanguage,
        purpose: jwtSignPurpose,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
        jwtid: jti,
      },
    );

    return { token, jti };
  } catch (error) {
    throw error;
  }
};

export default signJWT;
