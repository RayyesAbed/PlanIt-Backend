import { RegisterRequestDTO } from "../authDTOs";
import checkSupportedLanguage from "../utils/checkSupportedLanguage";
import User from "../../../schemas/User";
import createNewUser from "../services/register/createNewUser";
import signJWT from "../services/common/signJWT";

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
  }
};

export default registerService;
