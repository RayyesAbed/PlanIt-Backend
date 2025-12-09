import { redis } from "../../../../configs/redis";

const setRedisKey = async (jti: string, value: string) => {
  await redis.set(`jti=${jti}`, value, "EX", 3600);
};

export default setRedisKey;
