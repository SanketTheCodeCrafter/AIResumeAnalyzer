import React from "react";
import { FileSearch } from "lucide-react";

function EmptyReports() {
    const handleGenerateClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="flex flex-col items-center justify-center p-12 rounded-3xl border border-dashed border-border/60 bg-card/20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <FileSearch size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">No reports generated yet</h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
                Generate your first AI interview report to begin smarter interview preparation.
            </p>
            <button 
                onClick={handleGenerateClick}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
                Generate Report
            </button>
        </div>
    );
}

export default React.memo(EmptyReports);
