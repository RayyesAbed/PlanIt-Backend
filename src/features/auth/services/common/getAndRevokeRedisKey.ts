import { redis } from "../../../../configs/redis";
import HttpError from "../../../../errors/HttpError";
import emailVerificationCodes from "../../types/emailVerificationCodes";

export class TokenAlreadyUsedError extends HttpError {
  constructor() {
    super(emailVerificationCodes.ALREADY_VERIFIED, 401);
  }
}

export class TokenNotFoundError extends HttpError {
  constructor() {
    super(emailVerificationCodes.INVALID_TOKEN, 401);
  }
}

const getAndRevokeRedisKey = async (key: string): Promise<void> => {
  const value = await redis.get(key);

  if (value === "false") {
    await redis.set(key, "true", "KEEPTTL");
    return;
  }

  if (value === "true") {
    throw new TokenAlreadyUsedError();
  }

  throw new TokenNotFoundError();
};

export default getAndRevokeRedisKey;
