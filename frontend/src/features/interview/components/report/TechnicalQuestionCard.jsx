import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Copy, Check, Terminal, Lightbulb, Target, Play } from "lucide-react";
import { cn } from "../../../auth/utils/cn";
import { Button } from "../../../auth/components/Button";

const TechnicalQuestionCard = ({ question, index, isBehavioral = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(question.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "group rounded-2xl border border-border/40 bg-card/40 overflow-hidden transition-all duration-300",
        isOpen ? "ring-1 ring-primary/30 bg-card/60" : "hover:border-primary/30 hover:bg-card/50"
      )}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 cursor-pointer flex items-start justify-between gap-4"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-primary/60 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 uppercase tracking-widest">
              {isBehavioral ? "Behavioral" : "Technical"} Q{index + 1}
            </span>
            {isBehavioral && (
              <span className="text-[10px] font-bold text-amber-500/80 px-2 py-0.5 rounded-full bg-amber-500/5 border border-amber-500/10 uppercase tracking-widest">
                STAR Method
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
            {question.question}
          </h3>
        </div>
        <div className={cn(
          "shrink-0 p-2 rounded-xl bg-muted/50 transition-transform duration-300",
          isOpen ? "rotate-180 bg-primary/10 text-primary" : "group-hover:bg-muted"
        )}>
          <ChevronDown size={18} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-border/40 space-y-8">
              <div className="space-y-6 mt-6">
                {/* Intention */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <Target size={14} className="text-primary" />
                    Interviewer's Intention
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed bg-muted/30 p-4 rounded-xl border border-border/20 italic">
                    "{question.intention}"
                  </p>
                </div>

                {/* Answer */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      <Lightbulb size={14} className="text-amber-500" />
                      Ideal Answer Strategy
                    </div>
                    <button
                      onClick={handleCopy}
                      className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors px-2 py-1 rounded-lg hover:bg-muted"
                    >
                      {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>

                  {isBehavioral && (
                    <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 text-[10px] text-amber-500/80 font-medium flex items-center gap-2 mb-2">
                      <Terminal size={12} />
                      Tip: Use the STAR method (Situation, Task, Action, Result) for this response.
                    </div>
                  )}

                  <div className="p-5 rounded-xl bg-muted/20 border border-border/20 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {question.answer}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl gap-2 text-xs border-primary/20 hover:bg-primary/5 hover:text-primary"
                >
                  <Play size={14} />
                  Practice Now
                </Button>
                <span className="text-[10px] text-muted-foreground italic">
                  AI mock interview support coming soon
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TechnicalQuestionCard;
