import { redis } from "../../../../configs/redis";

const setRedisKey = async (jti: string, value: string) => {
  try {
    await redis.set(`jti=${jti}`, value, "EX", 3600);
  } catch (error) {
    throw error;
  }
};

export default setRedisKey;
