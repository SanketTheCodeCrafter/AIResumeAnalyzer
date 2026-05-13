import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../auth/utils/cn";

const MatchScoreCard = ({ score }) => {
  const getScoreColor = (s) => {
    if (s <= 40) return "text-destructive border-destructive/20 bg-destructive/5";
    if (s <= 70) return "text-amber-500 border-amber-500/20 bg-amber-500/5";
    return "text-success border-success/20 bg-success/5";
  };

  const getStrokeColor = (s) => {
    if (s <= 40) return "#ef4444"; // destructive
    if (s <= 70) return "#f59e0b"; // amber-500
    return "#22c55e"; // success
  };

  const getInterpretation = (s) => {
    if (s <= 40) return "Your profile has significant gaps for this role. Focus on fundamental technical skills.";
    if (s <= 70) return "Your profile partially matches this role. Bridge the specific skill gaps to improve readiness.";
    return "Excellent match! You have the core skills required. Focus on refining your delivery.";
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-3xl border border-border/50 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

      <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-muted/20"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke={getStrokeColor(score)}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tracking-tighter">{score}%</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Match</span>
        </div>
      </div>

      <div className="space-y-3 text-center md:text-left relative">
        <div className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider",
          getScoreColor(score)
        )}>
          {score <= 40 ? "Needs Work" : score <= 70 ? "Good Match" : "Strong Match"}
        </div>
        <h2 className="text-2xl font-bold tracking-tight">AI Analysis Summary</h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
          {getInterpretation(score)}
        </p>
      </div>
    </motion.div>
  );
};

export default MatchScoreCard;
