/** Must match on res.cookie and res.clearCookie (path, sameSite, secure). */
export const AUTH_TOKEN_COOKIE = "token";

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

function secureCookieFlag() {
  return process.env.NODE_ENV === "production";
}

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: secureCookieFlag(),
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: ONE_DAY_MS,
  };
}

/** Options for res.clearCookie — same path/sameSite/secure as set. */
export function getClearAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: secureCookieFlag(),
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  };
}
