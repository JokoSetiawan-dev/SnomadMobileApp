import { atom } from "recoil";

export const emailState = atom<string>({
  key: "emailState",
  default: "", // You can set an initial default value if needed
});