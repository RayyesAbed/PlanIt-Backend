import { RegisterRequestDTO } from "../authDTOs";
import checkSupportedLanguage from "../utils/checkSupportedLanguage";

const registerService = (
  registerCredentialsDTO: RegisterRequestDTO,
  deviceIPv6: string,
) => {
  checkSupportedLanguage(registerCredentialsDTO.preferredLanguage);
};

export default registerService;
