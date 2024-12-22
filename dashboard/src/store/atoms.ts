import { atom } from "recoil";
import { UserData } from "../types";

let userDataType: UserData;

export const userInfoAtom = atom({
    key: 'userInfoAtom',
    default: userDataType,
  });