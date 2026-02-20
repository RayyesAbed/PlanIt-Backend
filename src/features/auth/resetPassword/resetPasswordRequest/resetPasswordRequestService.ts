import User from "../../../../schemas/User";
import { toResetPasswordRequestDTO } from "../../authDTOMappers";

const resetPasswordRequestService = async (confirmedEmail: string) => {
  const user = await User.findOne({ confirmedEmail: confirmedEmail });

  if (user) {
    const resetPasswordCredentials = toResetPasswordRequestDTO(user);
  }
};

export default resetPasswordRequestService;
