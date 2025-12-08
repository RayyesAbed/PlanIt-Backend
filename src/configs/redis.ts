import Redis from "ioredis";
import loadSecrets from "./loadSecrets";

const redisCredentials = loadSecrets();

export const redis = new Redis({
  host: redisCredentials.REDIS_HOST,
  username: redisCredentials.REDIS_USERNAME,
  password: redisCredentials.REDIS_PASSWORD,
  port: redisCredentials.REDIS_PORT,
  db: redisCredentials.REDIS_DB,
  reconnectOnError: () => true,
  maxRetriesPerRequest: redisCredentials.REDIS_MAX_RETRIES_PER_REQUEST,
  enableReadyCheck: true,
});

export const redisConnect = () => {
  redis.on("connect", () => {
    console.log("Redis connected");
  });

  redis.on("error", (err) => {
    console.error("Redis error: ", err);
  });
};
