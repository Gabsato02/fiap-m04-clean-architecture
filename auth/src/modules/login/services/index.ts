import api from "../../../requests";

export const createUser = (payload) => api.post('/user', payload);

export const login = (payload) => api.post('/user/auth', payload);