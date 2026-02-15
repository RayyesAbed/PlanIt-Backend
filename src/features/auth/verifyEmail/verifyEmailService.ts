import verifyJWT from "../services/common/verifyJWT";
import getAndRevokeRedisKey from "../services/common/getAndRevokeRedisKey";
import User from "../../../schemas/User";

const verifyEmailService = async (token: string) => {
  const payload = verifyJWT(token);

  await getAndRevokeRedisKey(payload.jti ?? "");

  const user = await User.findById(payload.userId);
};

export default verifyEmailService;
