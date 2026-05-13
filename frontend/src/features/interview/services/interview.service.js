import httpClient from "../../../lib/axios";

/* ── Interview Service ───────────────────────────────────────
 *  Pure data layer — zero React code.
 *  Handles HTTP communication and request formatting.
 *
 *  Methods:
 *    • generateReport  → POST /api/interview (multipart)
 *    • getReportById   → GET  /api/interview/:id
 *    • getAllReports    → GET  /api/interview
 * ─────────────────────────────────────────────────────────── */

/**
 * @description Generate an AI interview report from resume, self description, and job description.
 * @param {{ resume: File, selfDescription: string, jobDescription: string }} data
 * @returns {Promise<{ success: boolean, data: object }>}
 */
export async function generateReport(data) {
    const formData = new FormData();
    formData.append("resume", data.resume);
    formData.append("selfDescription", data.selfDescription);
    formData.append("jobDescription", data.jobDescription);

    return await httpClient.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/**
 * @description Fetch a single interview report by its ID.
 * @param {string} reportId
 * @returns {Promise<{ success: boolean, data: object }>}
 */
export async function getReportById(reportId) {
    return await httpClient.get(`/api/interview/${reportId}`);
}

/**
 * @description Fetch all interview reports for the authenticated user.
 * @returns {Promise<{ success: boolean, data: Array }>}
 */
export async function getAllReports() {
    return await httpClient.get("/api/interview");
}
