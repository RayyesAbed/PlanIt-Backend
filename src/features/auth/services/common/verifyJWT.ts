import loadSecrets from "../../../../configs/loadSecrets";
import jwt from "jsonwebtoken";
import emailVerificationCodes from "../../../../types/emailVerificationCodes";

const { JWT_SECRET } = loadSecrets();

const verifyJWT = (token: string) => {
  if (!token) throw new Error(emailVerificationCodes.INVALID_TOKEN);

  let payload: any;

  payload = jwt.verify(token, JWT_SECRET);

  if (typeof payload == "string")
    throw new Error(emailVerificationCodes.INVALID_TOKEN);
};

export default verifyJWT;
