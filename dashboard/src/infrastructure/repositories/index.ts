import {
  UserData,
  PaginatedTransactions,
  Transaction,
} from "../../domain/entities";
import api from "../http";

export const getUser = (): Promise<UserData> => api.get("/user");

export const getTransactions = (
  query: string = ""
): Promise<PaginatedTransactions> => api.get(`/transactions${query}`);

export const createTransaction = (payload: any): Promise<Transaction> =>
  api.post("/transactions", payload);

export const editTransaction = (
  payload: any,
  transactionId: number
): Promise<Transaction> => api.put(`/transactions/${transactionId}`, payload);
