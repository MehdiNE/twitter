import { atom } from "recoil";

export const postIdState = atom({
  key: "postIdState",
  default: "",
});

export const darkModeState = atom({
  key: "darkModeState",
  default: true,
});
export const lightModeState = atom({
  key: "lightModeState",
  default: false,
});
export const dimModeState = atom({
  key: "dimModeState",
  default: false,
});
