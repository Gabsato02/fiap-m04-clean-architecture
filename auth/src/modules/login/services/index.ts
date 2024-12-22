import api from "../../../requests";
import { AuthReturn, UserAuth } from "../../../types";

export const createUser = (payload: UserAuth) => api.post('/user', payload);

export const login = (payload: UserAuth): Promise<AuthReturn> => api.post<AuthReturn>('/login', payload);