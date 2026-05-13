import { useContext } from "react";
import { InterviewContext } from "../context/interview.context.jsx";

/* ── useInterview Hook ───────────────────────────────────────
 *  Thin consumer hook for the InterviewContext.
 *
 *  Returns:
 *    • interviewState  → { report, reports, isGenerating, isLoading, error }
 *    • generateReport  → async (formData) => { success, data?, message? }
 *    • fetchReport     → async (id) => { success, data?, message? }
 *    • fetchAllReports → async () => { success, data?, message? }
 *    • clearError      → () => void
 *    • clearReport     → () => void
 *
 *  Throws if used outside of <InterviewProvider />.
 * ─────────────────────────────────────────────────────────── */
export function useInterview() {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error(
            "useInterview must be used within an <InterviewProvider />. " +
            "Wrap your interview routes with <InterviewProvider> in app.routes.jsx."
        );
    }

    return context;
}
