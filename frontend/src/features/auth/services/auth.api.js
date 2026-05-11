import httpClient from "../../../lib/axios.js";

/* ── Auth API Layer ──────────────────────────────────────────
 *  Pure API request functions — no state, no side effects.
 *  Each function returns the server response payload directly
 *  (unwrapped by the axios interceptor).
 *
 *  Errors bubble up as Error objects with the server's message
 *  so the calling layer (context) can handle them uniformly.
 * ─────────────────────────────────────────────────────────── */

/**
 * Register a new user account.
 * @param {{ username: string, email: string, password: string }} credentials
 * @returns {Promise<{ success: boolean, message: string, user: object }>}
 */
export function registerUser(credentials) {
  return httpClient.post("/api/auth/register", credentials);
}

/**
 * Authenticate an existing user.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ success: boolean, message: string, user: object }>}
 */
export function loginUser(credentials) {
  return httpClient.post("/api/auth/login", credentials);
}

/**
 * End the current session (server blacklists the token).
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export function logoutUser() {
  return httpClient.post("/api/auth/logout");
}

/**
 * Retrieve the currently authenticated user's profile.
 * Used on app mount to bootstrap the session from the cookie.
 * @returns {Promise<{ success: boolean, message: string, user: object }>}
 */
export function getCurrentUser() {
  return httpClient.get("/api/auth/get-user");
}
