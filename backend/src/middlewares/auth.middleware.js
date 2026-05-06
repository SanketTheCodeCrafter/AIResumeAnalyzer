import jwt from "jsonwebtoken";
import { blacklistTokenModel } from "../models/blacklist.model.js";
import { AUTH_TOKEN_COOKIE } from "../constants/authCookie.js";
import { extractAuthToken } from "../utils/authToken.js";

async function authUser(req, res, next) {
  try {
    const token = extractAuthToken(req, AUTH_TOKEN_COOKIE);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token has been revoked.",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to authenticate user",
      error: error.message,
    });
  }
}

export default authUser;
