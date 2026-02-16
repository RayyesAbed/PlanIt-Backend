import { LoginDTO } from "../authDTOs";
import User from "../../../schemas/User";
import * as argon2 from "argon2";

const loginService = async (loginCredentialsDTO: LoginDTO) => {
  const existingUser = await User.findOne({
    confirmedEmail: loginCredentialsDTO.email,
  }).lean();

  if (existingUser) {
    const doPasswordsMatch = await argon2.verify(
      existingUser.password,
      loginCredentialsDTO.password,
    );
  }
};

export default loginService;
