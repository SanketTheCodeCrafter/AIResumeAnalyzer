import rateLimit from "express-rate-limit";

/* ── Auth Rate Limiter ───────────────────────────────────────
 *  Prevents brute-force attacks on authentication endpoints.
 *
 *  Configuration:
 *    - Window: 15 minutes
 *    - Max requests: 15 per IP per window
 *    - Applies to: all /api/auth/* routes
 *
 *  Why these numbers?
 *    - 15 req/15 min is generous enough for legitimate users
 *      (login + register + google + retries)
 *    - Tight enough to stop credential stuffing / brute force
 *    - Standard headers inform clients of remaining quota
 * ────────────────────────────────────────────────────────── */

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again after 15 minutes.",
  },
});
