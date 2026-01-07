const DEFAULT_API_BASE_URL = "http://localhost:3000";

// const envBaseUrl = import.meta.env.VITE_API_URL;

const baseUrl = DEFAULT_API_BASE_URL;
const API_BASE_URL = baseUrl.replace(/\/+$/, "");

export default API_BASE_URL;
