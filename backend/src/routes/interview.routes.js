import express from "express";
import {generateInterviewReportController, getInterviewReportController} from "../controllers/interview.controller.js";
import authUser from "../middlewares/auth.middleware.js";
import { uploadResume } from "../middlewares/file.middleware.js";
const router = express.Router();


/**
 * @route POST /api/interview
 * @description Generate Interview Report on the basis of user self description, resume pdf and job description
 * @access Private
 */
router.post("/", authUser, uploadResume, generateInterviewReportController)

/**
 * @route GET /api/interview/:interviewId
 * @description Get a specific interview report by ID
 * @access Private
 */
router.get("/:interviewId", authUser, getInterviewReportController)

export default router;

