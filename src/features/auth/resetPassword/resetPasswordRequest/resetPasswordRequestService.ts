import User from "../../../../schemas/User";
import signJWT from "../../services/common/signJWT";
import setRedisKey from "../../services/common/setRedisKey";
import sendLinkWithEmail from "../../utils/sendLinkWithEmail";
import fakeUserData from "./fakeUserData";
import IUser from "../../../../interfaces/IUser";

const resetPasswordRequestService = async (confirmedEmail: string) => {
  const user = await User.findOne({ confirmedEmail: confirmedEmail });

  const existingUser = (user ? user : fakeUserData) as IUser;

  const { token, jti } = signJWT(
    existingUser,
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
