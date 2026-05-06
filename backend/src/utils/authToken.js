export function extractAuthToken(req, cookieName) {
  const fromCookie = req.cookies?.[cookieName];
  if (fromCookie) return fromCookie;
  const auth = req.headers.authorization;
  if (!auth || typeof auth !== "string") return null;
  const match = auth.match(/^Bearer\s+(\S+)/i);
  return match?.[1] ?? null;
}
