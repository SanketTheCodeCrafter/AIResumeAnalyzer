import { PDFParse } from 'pdf-parse';
import generateInterviewReport from '../services/ai.service.js';
import interviewReportModel from '../models/interviewReport.model.js';

export async function generateInterviewReportController(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body;

        // Validate required text fields
        if (!selfDescription || !jobDescription) {
            return res.status(400).json({
                success: false,
                error: 'Self description and job description are required.'
            });
        }

        // Validate file upload
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'Resume PDF file is required.'
            });
        }

        // Validate file type
        if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({
                success: false,
                error: 'Only PDF files are allowed.'
            });
        }

        // Parse PDF — pdf-parse v2 exports PDFParse as a named export (no default)
        // getText() returns TextResult { pages, text, total } — NOT a raw string
        console.log('[DEBUG 1] Starting PDF parse...');
        let resumeContent;
        try {
            const result = await new PDFParse(Uint8Array.from(req.file.buffer)).getText();
            resumeContent = result.text;  // TextResult.text is the concatenated string
        } catch (error) {
            console.error('[DEBUG 1] PDF parsing error:', error.message);
            return res.status(400).json({
                success: false,
                error: 'Failed to parse the uploaded PDF file.'
            });
        }

        // Validate extracted text
        console.log('[DEBUG 2] Extracted text length:', resumeContent?.length);
        if (!resumeContent?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Unable to extract text from the uploaded resume.'
            });
        }

        // Generate AI report
        console.log('[DEBUG 3] Starting AI generation...');
        let interviewReportByAi;
        try {
            interviewReportByAi = await generateInterviewReport({
                resume: resumeContent.trim(),
                selfDescription,
                jobDescription
            });
        } catch (error) {
            console.error('[DEBUG 3] AI generation error:', error.message);
            return res.status(500).json({
                success: false,
                error: 'Failed to generate interview report from AI.'
            });
        }

        // Validate AI response
        console.log('[DEBUG 4] AI report keys:', Object.keys(interviewReportByAi));
        if (!interviewReportByAi) {
            return res.status(400).json({
                success: false,
                error: 'Failed to generate interview report.'
            });
        }

        // Save report in database
        console.log('[DEBUG 5] Saving to database...');
        let interviewReport;
        try {
            interviewReport = await interviewReportModel.create({
                user: req.user.id,
                resume: resumeContent.trim(),
                selfDescription,
                jobDescription,
                ...interviewReportByAi
            });
        } catch (error) {
            console.error('[DEBUG 5] Database save error:', error.message);
            return res.status(500).json({
                success: false,
                error: 'Failed to save interview report to database.'
            });
        }

        console.log('[DEBUG 6] Success!');
        return res.status(201).json({
            success: true,
            message: 'Interview report generated successfully.',
            data: interviewReport
        });

    } catch (error) {
        console.error('[DEBUG OUTER] Unexpected error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error while generating interview report.'
        });
    }
}

export async function getInterviewReportController(req, res) {
    try {
        const { interviewId } = req.params;

        const report = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                error: 'Interview report not found.'
            });
        }

        return res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        console.error('[DEBUG GET] Error:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Internal server error while fetching interview report.'
        });
    }
}