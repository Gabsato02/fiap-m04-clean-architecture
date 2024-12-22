export type UserAuth = {
  password: string;
  username?: string;
  email: string;
}

export type AuthReturn = {
  token: string
}