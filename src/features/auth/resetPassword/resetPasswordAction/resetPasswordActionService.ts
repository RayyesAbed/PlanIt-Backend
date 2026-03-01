import jwt from "jsonwebtoken";
import verifyJWT from "../../services/common/verifyJWT";
import getAndRevokeRedisKey from "../../services/common/getAndRevokeRedisKey";
import User from "../../../../schemas/User";
import * as argon2 from "argon2";

const resetPasswordActionService = async (
  token: string,
  newPassword: string,
) => {
  let decoded: jwt.JwtPayload;

  decoded = verifyJWT(token);

  await getAndRevokeRedisKey(decoded.jti as string);

  await User.findByIdAndUpdate(decoded.userId, {
    password: await argon2.hash(newPassword),
  });
};

export default resetPasswordActionService;
