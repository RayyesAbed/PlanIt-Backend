import { RegisterRequestDTO } from "../authDTOs";
import checkSupportedLanguage from "../utils/checkSupportedLanguage";
import User from "../../../schemas/User";
import createNewUser from "./createNewUser";
import signJWT from "../services/common/signJWT";
import setRedisKey from "../services/common/setRedisKey";
import sendLinkWithEmail from "../utils/sendLinkWithEmail";

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
  });
  if (!existingUser) {
    const newUser = await createNewUser(registerCredentialsDTO, deviceIPv6);

    const { token, jti } = signJWT(
      registerCredentialsDTO,
      "register_user",
      newUser._id,
    );

    setRedisKey(jti, "false");

    await sendLinkWithEmail(
      newUser.name,
      newUser.toBeConfirmedEmail!,
      newUser.preferredLanguage,
      "emailVerify",
      token,
    );
  }
};

export default registerService;
