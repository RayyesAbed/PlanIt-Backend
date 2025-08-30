export const getEnvVariables = () => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const FRONTEND_URL = process.env.FRONTEND_URL;

  if (!JWT_SECRET || !FRONTEND_URL) {
    throw new Error("Environment variables were not succesfully loaded");
  }

  return { JWT_SECRET, FRONTEND_URL };
};
