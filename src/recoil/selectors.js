// selectors.js
import { selector } from "recoil";
import { stub } from "./atoms";

export const postStub = selector({
  key: 'postStub', 
  get: ({get}) => {
    const text = get(stub);
    return text; 
  },
});
