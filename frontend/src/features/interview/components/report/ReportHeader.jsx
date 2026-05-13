import React from "react";
import { motion } from "framer-motion";
import { Share2, Download, MoreVertical, Sparkles } from "lucide-react";
import { Button } from "../../../auth/components/Button";

const ReportHeader = ({ title }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <Sparkles size={16} />
          </div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Analysis Report</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {title || "Interview Preparation Guide"}
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Personalized strategy based on your resume and target job description.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="rounded-xl gap-2 border-border/60">
          <Share2 size={16} />
          Share
        </Button>
        <Button variant="outline" size="sm" className="rounded-xl gap-2 border-border/60">
          <Download size={16} />
          Download PDF
        </Button>
        <Button variant="outline" size="icon" className="rounded-xl border-border/60">
          <MoreVertical size={18} />
        </Button>
      </div>
    </header>
  );
};

export default ReportHeader;
