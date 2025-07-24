import { RegisterRequestDTO } from "./authDTOs";

export const toRegisterDTO = (credentials: any): RegisterRequestDTO => {
  return {
    name: credentials.name,
    toBeConfirmedEmail: credentials.toBeConfirmedEmail,
    password: credentials.password,
  };
};
