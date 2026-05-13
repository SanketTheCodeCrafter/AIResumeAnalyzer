import React, { useEffect, useMemo } from "react";
import { useInterview } from "../../hooks/useInterview";
import InterviewReportCard from "./InterviewReportCard.jsx";
import ReportSkeleton from "./ReportSkeleton.jsx";
import EmptyReports from "./EmptyReports.jsx";

function RecentReports() {
    const { interviewState, fetchAllReports } = useInterview();
    const { reports, isLoading, error } = interviewState;

    useEffect(() => {
        // Fetch all reports on mount
        fetchAllReports();
    }, [fetchAllReports]);

    // Sort newest first and take max 6. useMemo for performance.
    const recentReports = useMemo(() => {
        if (!reports || !Array.isArray(reports) || reports.length === 0) return [];
        return [...reports]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6);
    }, [reports]);

    return (
        <section className="mt-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">Your Interview Reports</h2>
                    <p className="text-muted-foreground text-sm">
                        Review and continue preparing from your previously generated reports
                    </p>
                </div>
                {reports && reports.length > 0 && (
                    <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0">
                        View All
                    </button>
                )}
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ReportSkeleton />
                    <ReportSkeleton />
                    <ReportSkeleton />
                </div>
            ) : error && (!reports || reports.length === 0) ? (
                <div className="text-destructive text-sm bg-destructive/10 p-4 rounded-xl border border-destructive/20">
                    Failed to load reports: {error}
                </div>
            ) : recentReports.length === 0 ? (
                <EmptyReports />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentReports.map((report) => (
                        <InterviewReportCard key={report._id} report={report} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default React.memo(RecentReports);
