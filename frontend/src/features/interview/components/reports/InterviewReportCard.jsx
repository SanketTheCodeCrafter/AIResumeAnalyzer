import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";

function getScoreConfig(score) {
    if (score >= 71) {
        return { label: "Strong Match", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    }
    if (score >= 41) {
        return { label: "Moderate Match", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    }
    return { label: "Weak Match", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" };
}

function InterviewReportCard({ report }) {
    const navigate = useNavigate();
    const config = getScoreConfig(report.matchScore);
    
    // Formatter initialized once per render, highly performant
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(new Date(report.createdAt));

    const handleClick = () => {
        navigate(`/interview/${report._id}`);
    };

    return (
        <div 
            onClick={handleClick}
            className="group cursor-pointer rounded-2xl border border-border/40 bg-card/40 p-6 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md relative overflow-hidden flex flex-col min-h-[140px]"
        >
            <div className="flex flex-col h-full gap-4 relative z-10 flex-1">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                        {report.title || "Unknown Title"}
                    </h3>
                    
                    <div className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-semibold border ${config.bg} ${config.color} ${config.border} flex items-center gap-1`}>
                        {report.matchScore || 0}% 
                    </div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/40">
                    <div className="flex items-center text-xs text-muted-foreground gap-1.5">
                        <Calendar size={14} />
                        <span>{formattedDate}</span>
                    </div>
                    
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <ChevronRight size={16} />
                    </div>
                </div>
            </div>
            
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
}

export default React.memo(InterviewReportCard);
