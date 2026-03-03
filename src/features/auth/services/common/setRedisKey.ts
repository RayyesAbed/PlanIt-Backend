import { redis } from "../../../../configs/redis";

const setRedisKey = async (
  jti: string,
  value: string,
  ttlInSeconds: number,
) => {
  try {
    await redis.set(`jti=${jti}`, value, "EX", ttlInSeconds);
  } catch (error) {
    throw error;
  }
};

export default setRedisKey;
