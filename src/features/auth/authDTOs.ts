export type RegisterRequestDTO = {
  name: string;
  toBeConfirmedEmail: string;
  birthDate: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};
