import { RegisterRequestDTO } from "../authDTOs";
import checkSupportedLanguage from "../utils/checkSupportedLanguage";
import User from "../../../schemas/User";
import createNewUser from "./createNewUser";
import signJWT from "../services/common/signJWT";
import setRedisKey from "../services/common/setRedisKey";
import sendLinkWithEmail from "../utils/sendLinkWithEmail";
import createFakeUser from "./createFakeUser";
import loadSecrets from "../../../configs/loadSecrets";
import IUser from "../../../interfaces/IUser";

const { FAKE_USER_EMAIL } = loadSecrets();

const registerService = async (
  registerCredentialsDTO: RegisterRequestDTO,
  deviceIPv6: string,
) => {
  checkSupportedLanguage(registerCredentialsDTO.preferredLanguage);
  const existingUser = await User.findOne({
    $or: [
      { confirmedEmail: registerCredentialsDTO.toBeConfirmedEmail },
      { toBeConfirmedEmail: registerCredentialsDTO.toBeConfirmedEmail },
    ],
  }).lean();

  const isUserNew = !existingUser;

  const newUser = (
    isUserNew
      ? await createNewUser(registerCredentialsDTO, deviceIPv6)
      : createFakeUser(existingUser)
  ) as IUser;

  const { token, jti } = signJWT(newUser, "register_user", newUser._id, 3600);

  setRedisKey(jti, "false", 3600);

  await sendLinkWithEmail(
    newUser.name,
    isUserNew ? newUser.toBeConfirmedEmail! : FAKE_USER_EMAIL,
    newUser.preferredLanguage,
    "emailVerify",
    token,
  );
};

export default registerService;
