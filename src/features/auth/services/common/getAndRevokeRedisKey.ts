import { redis } from "../../../../configs/redis";
import setRedisKey from "./setRedisKey";

const getAndRevokeRedisKey = async (jti: string) => {
  const value = await redis.get(`jti=${jti}`);

  if (value === "false") {
    await setRedisKey(jti, "true");
    return true;
  } else if (value === "true") {
    throw new Error("Email already verified");
  } else {
    throw new Error("Expired verification link");
  }
};

export default getAndRevokeRedisKey;
