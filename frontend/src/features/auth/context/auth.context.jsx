import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth.api.js";

/* ── Auth Context ────────────────────────────────────────────
 *  Single source of truth for authentication state.
 *
 *  Responsibilities:
 *    1. Bootstrap session on mount (cookie → user)
 *    2. Expose login / register / logout actions
 *    3. Manage loading + error states
 *    4. Provide stable context value (memoized)
 * ─────────────────────────────────────────────────────────── */

export const AuthContext = createContext(null);

const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
  isBootstrapping: true,
  isSubmitting: false,
  error: "",
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(INITIAL_STATE);

  /* ── Session Bootstrap ─────────────────────────────────── */
  useEffect(() => {
    let ignore = false;

    async function bootstrapSession() {
      try {
        const data = await getCurrentUser();

        if (!ignore) {
          setAuthState({
            user: data.user,
            isAuthenticated: true,
            isBootstrapping: false,
            isSubmitting: false,
            error: "",
          });
        }
      } catch {
        if (!ignore) {
          setAuthState((prev) => ({
            ...prev,
            isBootstrapping: false,
            isAuthenticated: false,
            user: null,
          }));
        }
      }
    }

    bootstrapSession();

    return () => {
      ignore = true;
    };
  }, []);

  /* ── Helpers ────────────────────────────────────────────── */
  function extractErrorMessage(error) {
    return error instanceof Error ? error.message : "Something went wrong.";
  }

  /* ── Login ──────────────────────────────────────────────── */
  const login = useCallback(async (credentials) => {
    setAuthState((prev) => ({ ...prev, isSubmitting: true, error: "" }));

    try {
      const data = await loginUser(credentials);

      setAuthState({
        user: data.user,
        isAuthenticated: true,
        isBootstrapping: false,
        isSubmitting: false,
        error: "",
      });

      return { success: true };
    } catch (error) {
      const message = extractErrorMessage(error);

      setAuthState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: message,
      }));

      return { success: false, message };
    }
  }, []);

  /* ── Register ───────────────────────────────────────────── */
  const register = useCallback(async (credentials) => {
    setAuthState((prev) => ({ ...prev, isSubmitting: true, error: "" }));

    try {
      const data = await registerUser(credentials);

      setAuthState({
        user: data.user,
        isAuthenticated: true,
        isBootstrapping: false,
        isSubmitting: false,
        error: "",
      });

      return { success: true };
    } catch (error) {
      const message = extractErrorMessage(error);

      setAuthState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: message,
      }));

      return { success: false, message };
    }
  }, []);

  /* ── Logout ─────────────────────────────────────────────── */
  const logout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isSubmitting: true, error: "" }));

    try {
      await logoutUser();

      setAuthState({
        user: null,
        isAuthenticated: false,
        isBootstrapping: false,
        isSubmitting: false,
        error: "",
      });
    } catch (error) {
      const message = extractErrorMessage(error);

      setAuthState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: message,
      }));
    }
  }, []);

  /* ── Context Value (memoized) ───────────────────────────── */
  const value = useMemo(
    () => ({ authState, login, register, logout }),
    [authState, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
