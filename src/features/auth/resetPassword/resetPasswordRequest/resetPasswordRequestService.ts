import User from "../../../../schemas/User";
import { toResetPasswordRequestDTO } from "../../authDTOMappers";
import signJWT from "../../services/common/signJWT";
import setRedisKey from "../../services/common/setRedisKey";

const resetPasswordRequestService = async (confirmedEmail: string) => {
  const user = await User.findOne({ confirmedEmail: confirmedEmail });

  if (user) {
    const resetPasswordCredentials = toResetPasswordRequestDTO(user);

    const { token, jti } = signJWT(
      resetPasswordCredentials,
      "reset_password",
      user._id,
    );

    setRedisKey(jti, "false");
  }
};

export default resetPasswordRequestService;
