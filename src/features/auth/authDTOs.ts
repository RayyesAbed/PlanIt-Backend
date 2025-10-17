export type RegisterRequestDTO = {
  name: string;
  toBeConfirmedEmail: string;
  birthDate: string;
  preferredLanguage: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};
