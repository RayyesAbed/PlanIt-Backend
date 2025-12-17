import { redis } from "../../../../configs/redis";
import HttpError from "../../../../errors/HttpError";
import setRedisKey from "./setRedisKey";

export class TokenAlreadyUsedError extends HttpError {
  constructor() {
    super("TOKEN_ALREADY_USED", 401);
  }
}

export class TokenNotFoundError extends HttpError {
  constructor() {
    super("TOKEN_NOT_FOUND", 401);
  }
}

const getAndRevokeRedisKey = async (jti: string): Promise<void> => {
  const value = await redis.get(`jti=${jti}`);

  if (value === "false") {
    await setRedisKey(jti, "true");
    return;
  }

  if (value === "true") {
    throw new TokenAlreadyUsedError();
  }

  throw new TokenNotFoundError();
};

export default getAndRevokeRedisKey;
