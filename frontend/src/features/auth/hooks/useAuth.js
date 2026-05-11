import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";

/* ── useAuth Hook ────────────────────────────────────────────
 *  Thin consumer hook for the AuthContext.
 *
 *  Returns:
 *    • authState  → { user, isAuthenticated, isBootstrapping, isSubmitting, error }
 *    • login      → async (credentials) => { success, message? }
 *    • register   → async (credentials) => { success, message? }
 *    • logout     → async () => void
 *
 *  Throws if used outside of <AuthProvider />.
 * ─────────────────────────────────────────────────────────── */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an <AuthProvider />. " +
        "Wrap your component tree with <AuthProvider> in App.jsx."
    );
  }

  return context;
}
