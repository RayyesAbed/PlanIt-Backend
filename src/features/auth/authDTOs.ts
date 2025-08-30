export type RegisterRequestDTO = {
  name: string;
  toBeConfirmedEmail: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};
