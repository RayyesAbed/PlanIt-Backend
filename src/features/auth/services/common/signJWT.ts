import jwt from "jsonwebtoken";
import { RegisterRequestDTO } from "../../authDTOs";
import loadSecrets from "../../../../configs/loadSecrets";
import { randomUUID } from "crypto";
import { Types } from "mongoose";

const signJWT = async (
  registerCredentialsDTO: RegisterRequestDTO,
  jwtSignPurpose: string,
  newUserId: Types.ObjectId
) => {
  const { JWT_SECRET } = loadSecrets();
  const verificationToken = jwt.sign(
    {
      userId: newUserId,
      lang: registerCredentialsDTO.preferredLanguage,
      purpose: jwtSignPurpose,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
      jwtid: randomUUID(),
    }
  );

  return verificationToken;
};

export default signJWT;
