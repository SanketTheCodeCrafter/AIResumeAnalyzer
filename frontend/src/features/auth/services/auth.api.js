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
 * Authenticate via Google OAuth.
 * Sends the Google ID token (credential) to the backend for verification.
 * Backend verifies with google-auth-library, finds/creates user, sets cookie.
 * @param {{ credential: string }} payload
 * @returns {Promise<{ success: boolean, message: string, user: object }>}
 */
export function googleLogin(payload) {
  return httpClient.post("/api/auth/google", payload);
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
