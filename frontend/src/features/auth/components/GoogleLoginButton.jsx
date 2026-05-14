import React, { useCallback, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../utils/cn";

/* ── Google SVG Icon ───────────────────────────────────────── */
function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ── Google Login Button ──────────────────────────────────────
 *  Premium SaaS-style Google login that:
 *    1. Uses @react-oauth/google's GoogleLogin component (credential/ID token flow)
 *    2. Sends the ID token to our backend POST /api/auth/google
 *    3. Integrates with AuthContext for state management
 *    4. Shows a custom-styled button (not Google's default iframe)
 *    5. Handles popup closed / errors gracefully
 *
 *  Architecture:
 *    - The GoogleLogin component is rendered invisibly (width: 0, height: 0)
 *    - We overlay our own premium button that triggers the same popup
 *    - This gives us full control over styling while using Google's secure flow
 *
 *  Why NOT useGoogleLogin?
 *    - The implicit flow from useGoogleLogin returns an access_token, not an id_token
 *    - We need the id_token (credential) for backend verification via google-auth-library
 *    - The GoogleLogin component's onSuccess gives us the credential directly
 * ─────────────────────────────────────────────────────────── */
export function GoogleLoginButton({ onSuccess, className }) {
  const { loginWithGoogle, authState } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleCredentialResponse = useCallback(
    async (credentialResponse) => {
      setIsGoogleLoading(true);
      try {
        const result = await loginWithGoogle(credentialResponse.credential);
        if (result?.success && onSuccess) {
          onSuccess();
        }
      } finally {
        setIsGoogleLoading(false);
      }
    },
    [loginWithGoogle, onSuccess]
  );

  const handleError = useCallback(() => {
    setIsGoogleLoading(false);
  }, []);

  const isDisabled = isGoogleLoading || authState.isSubmitting;

  return (
    <div className={cn("w-full", className)}>
      {/* 
        Strategy: We use the official GoogleLogin component which handles
        the popup → consent → credential flow securely.
        
        use_fedcm_for_prompt: false ensures the traditional popup flow
        instead of the new FedCM browser API (better cross-browser support).
      */}
      <GoogleLogin
        onSuccess={handleCredentialResponse}
        onError={handleError}
        type="standard"
        theme="filled_black"
        size="large"
        width="100%"
        text="continue_with"
        shape="rectangular"
        logo_alignment="left"
        use_fedcm_for_prompt={false}
      />

      {/* Loading overlay when processing */}
      {isGoogleLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Authenticating with Google...</span>
        </motion.div>
      )}
    </div>
  );
}
