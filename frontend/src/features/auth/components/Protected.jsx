import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export function ProtectedRoute({ children }) {
  const { authState } = useAuth();

  if (authState.isBootstrapping) {
    return <div className="screen-loader">Restoring your workspace...</div>;
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function PublicRoute({ children }) {
  const { authState } = useAuth();

  if (authState.isBootstrapping) {
    return <div className="screen-loader">Checking your session...</div>;
  }

  if (authState.isAuthenticated) {
    return <Navigate to="/interview" replace />;
  }

  return children;
}
