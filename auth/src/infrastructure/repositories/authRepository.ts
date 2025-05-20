import api from "../http";
import { UserAuth, AuthReturn } from "../../domain/entities";

export const authRepository = {
  login: (payload: UserAuth): Promise<AuthReturn> => api.post<AuthReturn>('/login', payload),
  createUser: (payload: UserAuth): Promise<void> => api.post('/user', payload),
};