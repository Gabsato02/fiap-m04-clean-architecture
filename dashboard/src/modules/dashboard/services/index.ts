import api from "../../../requests";
import { UserData } from "../../../types";

export const getUser = (): Promise<UserData> => api.get('/user');