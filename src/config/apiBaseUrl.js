const DEFAULT_API_BASE_URL = "http://localhost:3000";

const envBaseUrl = import.meta.env.VITE_API_URL;

// Use environment variable if available, otherwise fall back to default
// Remove trailing slash to avoid double slashes in API calls
const baseUrl = envBaseUrl || DEFAULT_API_BASE_URL;
const API_BASE_URL = baseUrl.replace(/\/+$/, "");

export default API_BASE_URL;
