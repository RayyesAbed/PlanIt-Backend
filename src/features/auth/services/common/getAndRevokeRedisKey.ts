import { redis } from "../../../../configs/redis";
import setRedisKey from "./setRedisKey";

export class TokenAlreadyUsedError extends Error {
  constructor() {
    super("TOKEN_ALREADY_USED");
  }
}

export class TokenNotFoundError extends Error {
  constructor() {
    super("TOKEN_NOT_FOUND");
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
