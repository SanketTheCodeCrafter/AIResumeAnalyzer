import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

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

export default router;
