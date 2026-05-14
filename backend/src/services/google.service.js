import { OAuth2Client } from "google-auth-library";
import { userModel } from "../models/user.model.js";

/* ── Google OAuth Service ──────────────────────────────────────
 *  Responsibilities:
 *    1. Verify Google ID tokens using google-auth-library
 *    2. Extract user payload (email, name, picture, sub)
 *    3. Find or create user in MongoDB
 *    4. Handle account linking (local user → Google)
 *
 *  Why a service layer?
 *    - Separation of concerns: controller handles HTTP, service handles business logic
 *    - Testable in isolation (mock the OAuth2Client)
 *    - Reusable across different controllers/routes
 * ───────────────────────────────────────────────────────────── */

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verify Google ID token and return the payload.
 * google-auth-library automatically checks:
 *   - Token signature (RSA)
 *   - Token expiry (exp claim)
 *   - Issuer (iss claim: accounts.google.com)
 *   - Audience (aud claim: matches our GOOGLE_CLIENT_ID)
 *
 * @param {string} credential - The Google ID token string
 * @returns {Promise<object>} Google user payload
 * @throws {Error} If token verification fails
 */
async function verifyGoogleToken(credential) {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token: empty payload.");
  }

  if (!payload.email_verified) {
    throw new Error("Google email is not verified.");
  }

  return payload;
}

/**
 * Generate a unique username from an email address.
 * Handles collisions by appending random digits.
 *
 * @param {string} email - User's email address
 * @returns {Promise<string>} A unique username
 */
async function generateUniqueUsername(email) {
  // Extract the part before @ and clean it
  const base = email
    .split("@")[0]
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 15);

  let username = base;
  let attempts = 0;

  // Check for collisions and append random digits if needed
  while (attempts < 5) {
    const existing = await userModel.findOne({ username });
    if (!existing) return username;

    const suffix = Math.floor(1000 + Math.random() * 9000);
    username = `${base}${suffix}`;
    attempts++;
  }

  // Fallback: use timestamp
  return `${base}${Date.now().toString(36)}`;
}

/**
 * Find an existing user or create a new one from Google profile data.
 * Handles three scenarios:
 *   1. User exists with this googleId → return user (fast path)
 *   2. User exists with same email (local account) → link Google account
 *   3. No user exists → create new Google user
 *
 * @param {string} credential - The Google ID token string
 * @returns {Promise<object>} The user document
 * @throws {Error} If token verification or DB operations fail
 */
export async function verifyAndFindOrCreateUser(credential) {
  // Step 1: Verify the token with Google
  const payload = await verifyGoogleToken(credential);

  const { sub: googleId, email, name, picture } = payload;

  // Step 2: Check if user already exists with this googleId (fast path)
  const existingGoogleUser = await userModel.findOne({ googleId });
  if (existingGoogleUser) {
    return existingGoogleUser;
  }

  // Step 3: Check if user exists with same email (account linking)
  const existingEmailUser = await userModel.findOne({ email });
  if (existingEmailUser) {
    // Link Google account to existing local account
    existingEmailUser.googleId = googleId;
    existingEmailUser.provider =
      existingEmailUser.provider === "local" ? "google" : existingEmailUser.provider;
    existingEmailUser.avatar = existingEmailUser.avatar || picture || "";
    existingEmailUser.isEmailVerified = true; // Google emails are verified
    await existingEmailUser.save();
    return existingEmailUser;
  }

  // Step 4: Create a brand new Google user
  const username = await generateUniqueUsername(email);

  const newUser = await userModel.create({
    username,
    email,
    provider: "google",
    googleId,
    avatar: picture || "",
    isEmailVerified: true, // Google emails are pre-verified
    // No password — Google users authenticate via Google
  });

  return newUser;
}
