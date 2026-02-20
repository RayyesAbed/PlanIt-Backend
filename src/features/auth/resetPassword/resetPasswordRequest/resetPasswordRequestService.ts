import User from "../../../../schemas/User";
import { toResetPasswordRequestDTO } from "../../authDTOMappers";
import signJWT from "../../services/common/signJWT";
import setRedisKey from "../../services/common/setRedisKey";
import sendLinkWithEmail from "../../utils/sendLinkWithEmail";

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

    await sendLinkWithEmail(
      user.name,
      user.confirmedEmail as string,
      user.preferredLanguage,
      "passwordReset",
      token,
    );
  }
};

export default resetPasswordRequestService;
