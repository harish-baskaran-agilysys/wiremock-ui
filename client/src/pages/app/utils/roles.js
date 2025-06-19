import { getFileContent, postFileContent, putFileContent } from "wiremock/axios";
import { decryptData, encryptData } from "./roleEncryption";

export const LOCAL_STORAGE_ROLE_KEY = "user-role-encrypted";
const ENCRYPTION_KEY = "staywiremock-secret";
const FIRST_USERS = {
  "satishnath.siddha@agilysys.com": "admin",
  "mohanraj.kesavan@agilysys.com": "admin",
  "harish.baskaran1@agilysys.com": "admin",
};

export const ROLE_OPTIONS = ["admin", "editor", "viewer"];

export const initializeDefaultRolesFile = async () => {
  const encryptedDefault = encryptData(FIRST_USERS, ENCRYPTION_KEY);
  const data = { roles: encryptedDefault };
  await postFileContent(data);
  return encryptedDefault;
};

export const initializeUserRole = async (email) => {
  try {
    let fileContent;

    try {
      const getData = await getFileContent();
      fileContent = getData['roles']
    } catch (error) {
      console.warn("Roles file not found, creating default.");
      fileContent = await initializeDefaultRolesFile();
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
  const defaultValue = "admin";

   if (typeof window === 'undefined') {
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
    return defaultValue ;
  }
};
