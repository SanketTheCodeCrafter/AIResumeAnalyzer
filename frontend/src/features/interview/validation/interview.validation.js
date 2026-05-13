import { z } from "zod";

export const interviewSchema = z.object({
  selfDescription: z
    .string()
    .min(50, "Self description must be at least 50 characters")
    .max(2000, "Keep it under 2000 characters"),
  jobDescription: z
    .string()
    .min(50, "Job description must be at least 50 characters")
    .max(5000, "Keep it under 5000 characters"),
  resume: z
    .any()
    .refine((file) => file instanceof File, "Please upload your resume in PDF format"),
});
