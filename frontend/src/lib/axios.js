import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ── Response Interceptor ────────────────────────────────────
 *  • Success  → unwrap and return `response.data` directly
 *  • API error → throw the server's `message` field
 *  • Network  → throw a human-readable fallback
 * ─────────────────────────────────────────────────────────── */
httpClient.interceptors.response.use(
  (response) => response.data,

  (error) => {
    if (error.response) {
      const serverMessage =
        error.response.data?.message || "Request failed. Please try again.";
      return Promise.reject(new Error(serverMessage));
    }

    if (error.request) {
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    }

    return Promise.reject(
      new Error("An unexpected error occurred. Please try again.")
    );
  }
);

export default httpClient;
