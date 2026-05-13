import React from "react";

function ReportSkeleton() {
    return (
        <div className="rounded-2xl border border-border/30 bg-card/20 p-6 flex flex-col gap-4 h-[140px] animate-pulse">
            <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1 pt-1">
                    <div className="h-5 bg-border/40 rounded-md w-3/4"></div>
                    <div className="h-5 bg-border/40 rounded-md w-1/2"></div>
                </div>
                <div className="h-6 w-12 bg-border/40 rounded-md shrink-0"></div>
            </div>
            <div className="mt-auto pt-4 flex justify-between border-t border-border/20">
                <div className="h-4 w-24 bg-border/40 rounded-md"></div>
                <div className="h-4 w-4 bg-border/40 rounded-full"></div>
            </div>
        </div>
    );
}

export default React.memo(ReportSkeleton);
