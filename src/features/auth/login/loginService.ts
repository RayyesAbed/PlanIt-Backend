import { LoginDTO } from "../authDTOs";
import User from "../../../schemas/User";
import * as argon2 from "argon2";
import signJWT from "../services/common/signJWT";
import setRedisKey from "../services/common/setRedisKey";

const loginService = async (loginCredentialsDTO: LoginDTO) => {
  const existingUser = await User.findOne({
    confirmedEmail: loginCredentialsDTO.email,
  }).lean();

  if (existingUser) {
    const doPasswordsMatch = await argon2.verify(
      existingUser.password,
      loginCredentialsDTO.password,
    );

    if (doPasswordsMatch) {
      const loginToken = signJWT(
        loginCredentialsDTO,
        "login",
        existingUser._id,
      );

      await setRedisKey(loginToken.jti, "false");

      return loginToken;
    }
  }
};

export default loginService;
