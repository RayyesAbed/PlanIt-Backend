import { LoginDTO, RegisterRequestDTO } from "./authDTOs";

export const toRegisterDTO = (credentials: any): RegisterRequestDTO => {
  return {
    name: credentials.name,
    toBeConfirmedEmail: credentials.toBeConfirmedEmail,
    birthDate: credentials.birthDate,
    password: credentials.password,
  };
};

export const toLoginDTO = (credentials: any): LoginDTO => {
  return {
    email: credentials.email,
    password: credentials.password,
  };
};
