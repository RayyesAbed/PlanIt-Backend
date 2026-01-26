export type RegisterRequestDTO = {
  name: string;
  toBeConfirmedEmail: string;
  birthDate: string;
  preferredLanguage: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  preferredLanguage: string;
  password: string;
};

export type ResetPasswordRequestDTO = {
  name: string;
  confirmedEmail: string;
  preferredLanguage: string;
};
