import { getFileContent, putFileContent } from "wiremock/axios";
import { decryptData, encryptData } from "./roleEncryption";

export const ROLE_FILE = "roles.json";
const LOCAL_STORAGE_ROLE_KEY = "user-role-encrypted";
const ENCRYPTION_KEY = "staywiremock-secret";
const FIRST_USERS = {
  "satishnath.siddha@agilysys.com": "admin",
  "mohanraj.kesavan@agilysys.com": "admin",
  "harish.baskaran1@agilysys.com": "admin",
};

export const ROLE_OPTIONS = ["admin", "editor", "viewer"];

export const initializeUserRole = async (email) => {
  try {
    let fileContent;

    try {
      fileContent = await getFileContent(ROLE_FILE);
    } catch (error) {
      console.warn("Roles file not found, creating default.");
      const encryptedDefault = encryptData(FIRST_USERS, ENCRYPTION_KEY);
      await putFileContent(ROLE_FILE, encryptedDefault);
      fileContent = encryptedDefault;
    }

    const rolesJson = decryptData(fileContent, ENCRYPTION_KEY);
    const role = rolesJson[email];

    if (role) {
      const encryptedRole = encryptData(role, ENCRYPTION_KEY);
      localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, encryptedRole);
      console.log("User role stored securely");
    } else {
      console.warn("No role found for this user in roles file: " + email);
    }
  } catch (err) {
    console.error("Role initialization failed:", err);
  }
};

export const getDecryptedUserRole = () => {
  const encrypted = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY);
  if (!encrypted) return "viewer"; // default fallback

  try {
    const role = decryptData(encrypted, ENCRYPTION_KEY);
    return ROLE_OPTIONS.includes(role) ? role : "viewer";
  } catch (e) {
    console.error("Failed to decrypt role:", e);
    return "viewer";
  }
};
