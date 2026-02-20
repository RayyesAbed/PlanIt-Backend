import jwt from "jsonwebtoken";

const resetPasswordActionService = async (
  token: string,
  newPassword: string,
) => {
  let decoded: jwt.JwtPayload;
};

export default resetPasswordActionService;
