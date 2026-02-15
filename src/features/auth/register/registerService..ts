import { RegisterRequestDTO } from "../authDTOs";
import checkSupportedLanguage from "../utils/checkSupportedLanguage";
import User from "../../../schemas/User";

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
};

export default registerService;
