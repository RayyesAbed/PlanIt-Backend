import verifyJWT from "../services/common/verifyJWT";

const verifyEmailService = (token: string) => {
  const payload = verifyJWT(token);
};

export default verifyEmailService;
