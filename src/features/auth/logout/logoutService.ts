import verifyJWT from "../services/common/verifyJWT";

const logoutService = async (token: string) => {
  const payload = verifyJWT(token);
};

export default logoutService;
