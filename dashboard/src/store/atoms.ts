import { atom } from "recoil";
import { Transaction, UserData } from "../types";

let userDataType: UserData;

export const userInfoAtom = atom({
    key: 'userInfoAtom',
    default: userDataType,
  });

export const transactionsState = atom<Transaction[]>({
  key: 'transactionsState',
  default: [],
});