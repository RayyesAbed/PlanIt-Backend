import jwt, { JwtPayload } from "jsonwebtoken";
import loadSecrets from "../../../../configs/loadSecrets";
import HttpError from "../../../../errors/HttpError";
import emailVerificationCodes from "../../types/emailVerificationCodes";

const { JWT_SECRET } = loadSecrets();

export class InvalidJwtError extends HttpError {
  constructor() {
    super(emailVerificationCodes.INVALID_TOKEN, 401);
  }
}

const verifyJWT = (token?: string): JwtPayload => {
  if (!token) {
    throw new InvalidJwtError();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (typeof payload === "string") {
      throw new InvalidJwtError();
    }

    return payload;
  } catch (error: unknown) {
    throw new InvalidJwtError();
  }
};

export default verifyJWT;
