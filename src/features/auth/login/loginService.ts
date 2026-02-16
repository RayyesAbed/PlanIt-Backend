import { LoginDTO } from "../authDTOs";
import User from "../../../schemas/User";

const loginService = async (loginCredentialsDTO: LoginDTO) => {
  const existingUser = await User.findOne({
    confirmedEmail: loginCredentialsDTO.email,
  }).lean();
};

export default loginService;
