import jwt from "jsonwebtoken";
import verifyJWT from "../../services/common/verifyJWT";

const resetPasswordActionService = async (
  token: string,
  newPassword: string,
) => {
  let decoded: jwt.JwtPayload;

  decoded = verifyJWT(token);
};

export default resetPasswordActionService;
