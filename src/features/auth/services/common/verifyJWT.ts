import jwt, { JwtPayload } from "jsonwebtoken";
import loadSecrets from "../../../../configs/loadSecrets";

const { JWT_SECRET } = loadSecrets();

export class InvalidJwtError extends Error {
  constructor() {
    super("INVALID_JWT");
  }
}

const verifyJWT = (token?: string): JwtPayload => {
  if (!token) {
    throw new InvalidJwtError();
  }

  const payload = jwt.verify(token, JWT_SECRET);

  if (typeof payload === "string") {
    throw new InvalidJwtError();
  }

  return payload;
};

export default verifyJWT;
