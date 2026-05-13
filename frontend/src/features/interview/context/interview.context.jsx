import { createContext, useCallback, useMemo, useState } from "react";
import {
    generateReport as generateReportService,
    getReportById,
    getAllReports,
} from "../services/interview.service.js";

/* ── Interview Context ───────────────────────────────────────
 *  Single source of truth for interview feature state.
 *
 *  Responsibilities:
 *    1. Manage report / reports / loading / error state
 *    2. Expose memoized action methods
 *    3. Provide stable context value
 *
 *  Pattern: Mirrors AuthContext for architectural consistency.
 * ─────────────────────────────────────────────────────────── */

export const InterviewContext = createContext(null);

const INITIAL_STATE = {
    report: null,
    reports: [],
    isGenerating: false,
    isLoading: false,
    error: null,
};

export function InterviewProvider({ children }) {
    const [interviewState, setInterviewState] = useState(INITIAL_STATE);

    /* ── Helpers ──────────────────────────────────────────── */
    function extractErrorMessage(error) {
        return error instanceof Error ? error.message : "Something went wrong.";
    }

    /* ── Generate Report ─────────────────────────────────── */
    const generateReport = useCallback(async (formData) => {
        setInterviewState((prev) => ({
            ...prev,
            isGenerating: true,
            error: null,
        }));

        try {
            const response = await generateReportService(formData);

            setInterviewState((prev) => ({
                ...prev,
                report: response.data,
                isGenerating: false,
                error: null,
            }));

            return { success: true, data: response.data };
        } catch (error) {
            const message = extractErrorMessage(error);

            setInterviewState((prev) => ({
                ...prev,
                isGenerating: false,
                error: message,
            }));

            return { success: false, message };
        }
    }, []);

    /* ── Fetch Single Report ─────────────────────────────── */
    const fetchReport = useCallback(async (reportId) => {
        setInterviewState((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
        }));

        try {
            const response = await getReportById(reportId);

            setInterviewState((prev) => ({
                ...prev,
                report: response.data,
                isLoading: false,
                error: null,
            }));

            return { success: true, data: response.data };
        } catch (error) {
            const message = extractErrorMessage(error);

            setInterviewState((prev) => ({
                ...prev,
                isLoading: false,
                error: message,
            }));

            return { success: false, message };
        }
    }, []);

    /* ── Fetch All Reports ───────────────────────────────── */
    const fetchAllReports = useCallback(async () => {
        setInterviewState((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
        }));

        try {
            const response = await getAllReports();

            setInterviewState((prev) => ({
                ...prev,
                reports: response.data,
                isLoading: false,
                error: null,
            }));

            return { success: true, data: response.data };
        } catch (error) {
            const message = extractErrorMessage(error);

            setInterviewState((prev) => ({
                ...prev,
                isLoading: false,
                error: message,
            }));

            return { success: false, message };
        }
    }, []);

    /* ── Clear Actions ───────────────────────────────────── */
    const clearError = useCallback(() => {
        setInterviewState((prev) => ({ ...prev, error: null }));
    }, []);

    const clearReport = useCallback(() => {
        setInterviewState((prev) => ({ ...prev, report: null }));
    }, []);

    /* ── Context Value (memoized) ────────────────────────── */
    const value = useMemo(
        () => ({
            interviewState,
            generateReport,
            fetchReport,
            fetchAllReports,
            clearError,
            clearReport,
        }),
        [interviewState, generateReport, fetchReport, fetchAllReports, clearError, clearReport]
    );

    return (
        <InterviewContext.Provider value={value}>
            {children}
        </InterviewContext.Provider>
    );
}
