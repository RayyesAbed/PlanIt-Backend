import verifyJWT from "../services/common/verifyJWT";
import getAndRevokeRedisKey from "../services/common/getAndRevokeRedisKey";

const verifyEmailService = async (token: string) => {
  const payload = verifyJWT(token);
  await getAndRevokeRedisKey(payload.jti ?? "");
};

export default verifyEmailService;
