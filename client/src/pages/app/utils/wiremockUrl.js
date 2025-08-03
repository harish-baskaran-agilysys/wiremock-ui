const STORAGE_KEY = "wiremockUrl";

export const setWiremockUrl = (url) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, url);
  }
};

export const getWiremockUrl = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(STORAGE_KEY) || "http://stay-wiremock-dev-01.rguest.com:8070";
  }
  return "http://localhost:5001"; // fallback for server-side
};
