import {
  LoginDTO,
  RegisterRequestDTO,
  ResetPasswordRequestDTO,
} from "./authDTOs";

export const toRegisterDTO = (credentials: any): RegisterRequestDTO => {
  return {
    name: credentials.name,
    toBeConfirmedEmail: credentials.toBeConfirmedEmail,
    birthDate: credentials.birthDate,
    preferredLanguage: credentials.language,
    password: credentials.password,
  };
};

export const toLoginDTO = (credentials: any): LoginDTO => {
  return {
    email: credentials.email,
    password: credentials.password,
  };
};

export const toResetPasswordRequestDTO = (
  credentials: any
): ResetPasswordRequestDTO => {
  return {
    name: credentials.name,
    confirmedEmail: credentials.confirmedEmail,
    preferredLanguage: credentials.preferredLanguage,
  };
};
