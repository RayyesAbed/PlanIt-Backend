import { redis } from "../../../../configs/redis";
import emailVerificationCodes from "../../../../types/emailVerificationCodes";
import setRedisKey from "./setRedisKey";

const getAndRevokeRedisKey = async (jti: string) => {
  const value = await redis.get(`jti=${jti}`);

  if (value === "false") {
    await setRedisKey(jti, "true");
    return true;
  } else if (value === "true") {
    throw new Error(emailVerificationCodes.ALREADY_VERIFIED);
  } else {
    throw new Error(emailVerificationCodes.INVALID_TOKEN);
  }
};

export default getAndRevokeRedisKey;
