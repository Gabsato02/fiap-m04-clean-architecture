import { atom } from "recoil";
import { Transaction, UserData } from "../domain/entities";

let userDataType: UserData;

export const userInfoAtom = atom({
  key: "userInfoAtom",
  default: userDataType,
});

export const transactionsState = atom<Transaction[]>({
  key: "transactionsState",
  default: [],
});
