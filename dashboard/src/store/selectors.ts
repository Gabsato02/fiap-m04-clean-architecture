import { selectorFamily } from "recoil";
import { getTransactions } from "../infrastructure/repositories";
import { Transaction } from "../domain/entities";

export const transactionsByPageSelector = selectorFamily<Transaction[], number>(
  {
    key: "transactionsByPageSelector",
    get:
      (page: number) =>
      async ({ get }) => {
        const response = await getTransactions(`?page=${page}&size=10`);
        return response.transactions;
      },
  }
);
