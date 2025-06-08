// utils/roleEncryption.js
import CryptoJS from "crypto-js";

const PRIVATE_KEY = "your-static-client-side-key";

export const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), PRIVATE_KEY).toString();
  return ciphertext;
};

export const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, PRIVATE_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (e) {
    console.error("Decryption failed", e);
    return {};
  }
};
