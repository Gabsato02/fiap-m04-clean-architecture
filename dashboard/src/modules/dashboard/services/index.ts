import api from "../../../requests";
import { UserData, Transaction } from "../../../types";

export const getUser = (): Promise<UserData> => api.get('/user');

export const getTransactions = (): Promise<Transaction[]> => api.get('/transactions');