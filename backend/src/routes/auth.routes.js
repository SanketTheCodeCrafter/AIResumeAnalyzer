import express from "express";
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route POST/api/auth/register
 * @description Register a new user
 * @access Public
 */
router.post("/register", registerUser);

/**
 * @route POST/api/auth/login
 * @description Login a user with email and password
 * @access Public
 */
router.post("/login", loginUser);

/**
 * @route POST/api/auth/logout
 * @description Logout a user by blacklisting the token
 * @access Private
 */
router.post("/logout", authUser, logoutUser);

/**
 * @route GET/api/auth/get-user
 * @description Get the logged in user's details
 * @access Private
 */

router.get("/get-user", authUser, getUser);

export default router;
