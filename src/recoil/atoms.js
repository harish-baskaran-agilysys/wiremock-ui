// atoms.js
import { atom } from "recoil";

export const stub = atom({
  key: "stub",
  default: {
    name: "",
    request: {
      method: "",
    },
    response: {
      fixedDelayMilliseconds: 500,
      chunkedDribbleDelay: {
        numberOfChunks: 5,
        totalDuration: 1000,
      },
    },
  },
});
