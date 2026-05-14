import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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


    </header>
  );
};

export default ReportHeader;
