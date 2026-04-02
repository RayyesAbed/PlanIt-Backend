import verifyJWT from "../services/common/verifyJWT";
import getAndRevokeRedisKey from "../services/common/getAndRevokeRedisKey";
import User from "../../../schemas/User";
import Task from "../../../schemas/Task";

const verifyEmailService = async (token: string) => {
  const payload = verifyJWT(token);

  await getAndRevokeRedisKey(payload.jti ?? "");

  const user = await User.findById(payload.userId);

  if (!user) throw new Error("USER_NOT_FOUND");

  await user?.updateOne({
    confirmedEmail: user.toBeConfirmedEmail,
    toBeConfirmedEmail: "",
  });

  await Task.create({
    userId: user._id,
  });
};

export default verifyEmailService;
