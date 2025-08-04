import {
  getFileContent,
  postFileContent,
  putFileContent,
} from "wiremock/axios";
import { decryptData, encryptData } from "./roleEncryption";
import bcrypt from "bcryptjs";
import { useEffect } from "react";

export const LOCAL_STORAGE_ROLE_KEY = "user-role-encrypted";
const ENCRYPTION_KEY = "staywiremock-secret";
const FIRST_USERS = {
  "mohanraj.kesavan@agilysys.com": {
    role: "admin",
    password: bcrypt.hashSync("password", 10),
  },
  "harish.baskaran1@agilysys.com": {
    role: "admin",
    password: bcrypt.hashSync("password", 10),
  },
};

export const ROLE_OPTIONS = ["admin", "editor", "viewer"];

export const initializeDefaultRolesFile = async () => {
  const encryptedDefault = encryptData(FIRST_USERS, ENCRYPTION_KEY);
  const data = { roles: encryptedDefault };
  await postFileContent(data);
  return encryptedDefault;
};

export const initializeUserRole = async (email, password) => {
  try {
    let fileContent;

    try {
      const getData = await getFileContent();
      // fileContent = await initializeDefaultRolesFile();
      // console.log(fileContent);
      fileContent = getData["roles"];
    } catch (error) {
      console.warn("Roles file not found, creating default.");
      fileContent = await initializeDefaultRolesFile();
    }

    const rolesJson = decryptData(fileContent, ENCRYPTION_KEY);
    const userData = rolesJson[email];

    if (userData && bcrypt.compareSync(password, userData.password)) {
      const encryptedRole = encryptData(userData.role, ENCRYPTION_KEY);
      localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, encryptedRole);
      console.log("User role stored securely");
      return true;
    } else {
      const encryptedRole = encryptData("viewer", ENCRYPTION_KEY);
      localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, encryptedRole);
      console.warn("Invalid credentials for: " + email);
      return false;
    }
  } catch (err) {
    console.error("Role initialization failed:", err);
    return false;
  }
};

export const getDecryptedUserRole = () => {
  const defaultValue = "admin";

  if (typeof window === "undefined") {
    // Running on server - localStorage not available
    return defaultValue;
  }

  const encrypted = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY);
  if (!encrypted) return defaultValue; // default fallback

  try {
    const role = decryptData(encrypted, ENCRYPTION_KEY);
    return ROLE_OPTIONS.includes(role) ? role : defaultValue;
  } catch (e) {
    console.error("Failed to decrypt role:", e);
    return defaultValue;
  }
};
