import User from "../../../../schemas/User";
import { toResetPasswordRequestDTO } from "../../authDTOMappers";
import signJWT from "../../services/common/signJWT";
import setRedisKey from "../../services/common/setRedisKey";
import sendLinkWithEmail from "../../utils/sendLinkWithEmail";
import fakeUserData from "./fakeUserData";

const resetPasswordRequestService = async (confirmedEmail: string) => {
  const user = await User.findOne({ confirmedEmail: confirmedEmail });

  const existingUser = user ? user : fakeUserData;

  const resetPasswordCredentials = toResetPasswordRequestDTO(existingUser);

  const { token, jti } = signJWT(
    resetPasswordCredentials,
    "reset_password",
    existingUser._id,
    900,
  );

  setRedisKey(jti, "false", 900);

  await sendLinkWithEmail(
    existingUser.name,
    existingUser.confirmedEmail as string,
    existingUser.preferredLanguage,
    "passwordReset",
    token,
  );
};

export default resetPasswordRequestService;
