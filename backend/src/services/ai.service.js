import { GoogleGenAI } from '@google/genai';
import InterviewReportSchema from '../models/interviewReport.model.js';
import { z } from 'zod';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_KEY,
});

/**
 * --- Zod Schemas for AI Structured Output ---
 * 
 * Architectural Decision: Extracting sub-schemas ensures the DRY (Don't Repeat Yourself) principle.
 * 
 * WHY REUSABLE SCHEMAS?
 * 1. Maintainability: If the structure of a "question" or "skill gap" changes in the future 
 *    (e.g., adding a 'difficulty' field to questions), we only update it in one place.
 * 2. Readability: Keeps the main `interviewReportSchema` clean and easy to scan.
 * 3. Composition: Sub-schemas can be reused in other AI prompts or features if needed.
 */

const questionSchema = z.object({
    question: z.string().describe("Interview question text. Limit: 1-2 sentences."),
    intention: z.string().describe("Specific skill or trait evaluated. Limit: 1 short sentence."),
    answer: z.string().describe("Ideal expected answer. Limit: 2-3 sentences.")
}).describe("Single interview question item.");

const skillGapSchema = z.object({
    skill: z.string().describe("Name of missing or weak skill (e.g., 'AWS', 'System Design')."),
    severity: z.enum(["low", "medium", "high"]).describe("Impact level: 'low' (bonus skill), 'medium' (important), 'high' (dealbreaker).")
}).describe("Identified skill gap mapped from resume vs job description.");

const preparationPlanSchema = z.object({
    day: z.number().describe("Sequential day number (e.g., 1, 2, 3)."),
    focus: z.string().describe("Daily study theme. Limit: 3-5 words."),
    tasks: z.array(z.string()).describe("List of 2-3 actionable study tasks. Limit per task: 1 sentence.")
}).describe("Single day step in the preparation plan.");

export const interviewReportSchema = z.object({
    title: z.string().describe("Target job title derived from job description."),
    matchScore: z.number().min(0).max(100).describe("Integer 0-100 representing resume to job-description match percentage."),
    technicalQuestions: z.array(questionSchema).describe("List of 3-5 technical questions targeting the candidate's specific background."),
    behaviouralQuestions: z.array(questionSchema).describe("List of 2-3 behavioral questions targeting cultural fit and soft skills."),
    skillGaps: z.array(skillGapSchema).describe("List of up to 5 critical skill gaps. Empty array if perfect match."),
    preparationPlan: z.array(preparationPlanSchema).describe("Structured study plan spanning 3-7 days based on skill gaps.")
}).describe("Comprehensive structured interview preparation report.");


const MODELS = [
    "gemini-3.1-pro",
    "gemini-3.1-flash",
    "gemini-3-pro",
    "gemini-3-flash",
    "gemini-3.0-pro",
    "gemini-3.0-flash",
    "gemini-2.5-pro",
    "gemini-2.5-flash"
];



export default async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}`;

    let lastError = null;

    for (const modelName of MODELS) {
        try {
            const response = await ai.models.generateContent({
                model: modelName,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseJsonSchema: z.toJSONSchema(interviewReportSchema),
                }
            });

            const parsed = JSON.parse(response.text);
            return interviewReportSchema.parse(parsed);
        } catch (error) {
            console.error(`AI Model ${modelName} failed:`, error.message);
            lastError = error;
            continue; // Try next model
        }
    }

    throw new Error(`All AI models failed to generate the report. Last error: ${lastError?.message}`);
}