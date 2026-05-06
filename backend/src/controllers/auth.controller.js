import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { blacklistTokenModel } from "../models/blacklist.model.js";
import {
  AUTH_TOKEN_COOKIE,
  getAuthCookieOptions,
  getClearAuthCookieOptions,
} from "../constants/authCookie.js";
import { extractAuthToken } from "../utils/authToken.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "username, email and password are required",
      });
    }

    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie(AUTH_TOKEN_COOKIE, token, getAuthCookieOptions());

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie(AUTH_TOKEN_COOKIE, token, getAuthCookieOptions());

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};


export const logoutUser = async (req, res) => {
  try {
    const token = extractAuthToken(req, AUTH_TOKEN_COOKIE);
    const clearOpts = getClearAuthCookieOptions();

    if (!token) {
      res.clearCookie(AUTH_TOKEN_COOKIE, clearOpts);
      return res.status(200).json({
        success: true,
        message: "Logged out.",
      });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      res.clearCookie(AUTH_TOKEN_COOKIE, clearOpts);
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    await blacklistTokenModel.create({ token });

    res.clearCookie(AUTH_TOKEN_COOKIE, clearOpts);

    return res.status(200).json({
      success: true,
      message: "Logout successful. Token blacklisted.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to logout.",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get user details", 
      error: error.message,
    });
  }
};