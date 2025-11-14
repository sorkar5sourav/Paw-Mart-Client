const DEFAULT_API_BASE_URL = "http://localhost:3000";

const normalizeBaseUrl = (value) => {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed.replace(/\/+$/, "");
};

const envBaseUrl = normalizeBaseUrl(import.meta.env.VITE_API_URL);

const API_BASE_URL = envBaseUrl || DEFAULT_API_BASE_URL;

export default API_BASE_URL;
