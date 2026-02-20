import jwt from "jsonwebtoken";
import verifyJWT from "../../services/common/verifyJWT";
import getAndRevokeRedisKey from "../../services/common/getAndRevokeRedisKey";

const resetPasswordActionService = async (
  token: string,
  newPassword: string,
) => {
  let decoded: jwt.JwtPayload;

  decoded = verifyJWT(token);

  await getAndRevokeRedisKey(decoded.jti as string);
};

export default resetPasswordActionService;
