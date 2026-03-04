import { LoginDTO } from "../authDTOs";
import User from "../../../schemas/User";
import * as argon2 from "argon2";
import signJWT from "../services/common/signJWT";
import setRedisKey from "../services/common/setRedisKey";
import IUser from "../../../interfaces/IUser";

const loginService = async (loginCredentialsDTO: LoginDTO) => {
  const existingUser = (await User.findOne({
    confirmedEmail: loginCredentialsDTO.email,
  })) as IUser;

  if (existingUser) {
    const doPasswordsMatch = await argon2.verify(
      existingUser.password!,
      loginCredentialsDTO.password,
    );

    if (doPasswordsMatch) {
      const loginToken = signJWT(existingUser, "login", existingUser._id, 3600);

      await setRedisKey(loginToken.jti, "false", 3600);

      return loginToken;
    }
  }
};

export default loginService;
