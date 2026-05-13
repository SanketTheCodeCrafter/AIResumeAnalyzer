import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Circle } from "lucide-react";
import { cn } from "../../../auth/utils/cn";

const PreparationPlanCard = ({ plan, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="relative pl-10 md:pl-12 pb-12 last:pb-0"
    >
      {/* Timeline connector */}
      <div className="absolute left-[19px] md:left-[23px] top-2 bottom-0 w-px bg-border group-last:hidden" />

      {/* Timeline node */}
      <div className="absolute left-0 top-0 w-10 md:w-12 h-10 md:h-12 flex items-center justify-center">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-background border border-primary/30 flex items-center justify-center shadow-[0_0_15px_-5px_rgba(var(--primary),0.2)] z-10">
          <Calendar size={18} className="text-primary" />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-border/40 hover:border-primary/20 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10">
              Day {plan.day}
            </span>
            <h3 className="text-lg font-bold tracking-tight">{plan.focus}</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <CheckCircle2 size={14} className="text-success" />
            {plan.tasks?.length || 0} Recommended Tasks
          </div>
        </div>

        <ul className="space-y-3">
          {plan.tasks?.map((task, i) => (
            <motion.li
              key={i}
              whileHover={{ x: 5 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 border border-border/10 hover:bg-muted/40 transition-colors group"
            >
              <div className="mt-1 shrink-0">
                <Circle size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm text-foreground/80 leading-snug">{task}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default PreparationPlanCard;
