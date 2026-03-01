import verifyJWT from "../services/common/verifyJWT";
import getAndRevokeRedisKey from "../services/common/getAndRevokeRedisKey";

const logoutService = async (token: string) => {
  const payload = verifyJWT(token);

  await getAndRevokeRedisKey(payload.jti as string);
};

export default logoutService;
