import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "../../../auth/utils/cn";

const SkillGapCard = ({ skillGaps }) => {
  const getSeverityStyles = (severity) => {
    switch (severity) {
      case "high":
        return "text-destructive border-destructive/20 bg-destructive/10 shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)]";
      case "medium":
        return "text-amber-500 border-amber-500/20 bg-amber-500/10 shadow-[0_0_15px_-5px_rgba(245,158,11,0.3)]";
      case "low":
        return "text-success border-success/20 bg-success/10 shadow-[0_0_15px_-5px_rgba(34,197,94,0.3)]";
      default:
        return "text-muted-foreground border-border bg-muted/50";
    }
  };

  const getSeverityDot = (severity) => {
    switch (severity) {
      case "high": return "bg-destructive";
      case "medium": return "bg-amber-500";
      case "low": return "bg-success";
      default: return "bg-muted-foreground";
    }
  };

  const highGaps = skillGaps?.filter(g => g.severity === "high") || [];
  const mediumGaps = skillGaps?.filter(g => g.severity === "medium") || [];

  return (
    <div className="space-y-6">
      <div className="glass-card p-5 rounded-2xl border border-border/50">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
          <AlertTriangle size={14} className="text-primary" /> Skill Analysis
        </h3>

        <div className="flex flex-wrap gap-2">
          {skillGaps?.map((gap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all duration-300",
                getSeverityStyles(gap.severity)
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", getSeverityDot(gap.severity))} />
              {gap.skill}
            </motion.div>
          ))}
          {(!skillGaps || skillGaps.length === 0) && (
            <p className="text-xs text-muted-foreground italic">No skill gaps identified.</p>
          )}
        </div>
      </div>

      <div className="glass-card p-5 rounded-2xl border border-border/50 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Info size={14} className="text-primary" /> Quick Summary
        </h3>

        <div className="space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-success uppercase tracking-wider">Top Strength</span>
            <p className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 size={14} className="text-success" />
              Solid Core Foundations
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-destructive uppercase tracking-wider">Focus Areas</span>
            <p className="text-sm font-medium text-foreground/80 leading-relaxed">
              {highGaps.length > 0
                ? `You need to urgently brush up on ${highGaps.slice(0, 2).map(g => g.skill).join(", ")}.`
                : mediumGaps.length > 0
                  ? `Consider reviewing ${mediumGaps.slice(0, 2).map(g => g.skill).join(", ")} for better coverage.`
                  : "No major critical gaps found."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapCard;
