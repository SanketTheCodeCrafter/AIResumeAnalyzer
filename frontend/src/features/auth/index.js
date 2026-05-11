/* ── Auth Feature — Public API ────────────────────────────────
 *  Barrel export for the auth feature module.
 *  Import from "features/auth" instead of reaching into internals.
 * ─────────────────────────────────────────────────────────── */

export { AuthProvider } from "./context/auth.context.jsx";
export { useAuth } from "./hooks/useAuth.js";
export { ProtectedRoute, PublicRoute } from "./components/Protected.jsx";
