import { redis } from "../../../../configs/redis";

const setRedisKey = async (
  key: string,
  value: string,
  ttlInSeconds: number,
) => {
  try {
    await redis.set(key, value, "EX", ttlInSeconds);
  } catch (error) {
    throw error;
  }
};

export default setRedisKey;
