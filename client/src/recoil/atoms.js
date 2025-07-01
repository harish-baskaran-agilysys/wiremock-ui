// recoil/atoms.js
import { atom } from "recoil";

export const defaultStub = {
  name: "",
  request: {
    method: "",
    urlPath: "",
    queryParameters: {},
    headers: {},
    bodyPatterns: [],
    cookies: {},
  },
  response: {
    status: 200,
    statusMessage: "",
    body: {},
  },
  metadata: {
    author: "",
    folder: "",
    category: [] // array of category strings
  }
};

export const stub = atom({
  key: "stub",
  default: defaultStub,
});

export const sessionAtom = atom({
  key: "sessionAtom",
  default: {
    user: {
      name: "",
      email: ""
    }
  }
});