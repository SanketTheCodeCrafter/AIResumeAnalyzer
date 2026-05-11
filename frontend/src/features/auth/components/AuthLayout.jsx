import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen w-full auth-bg flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Brand Logo - Top Centered */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-8 flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <span className="font-semibold tracking-tight text-lg">AI Resume Analyzer</span>
      </motion.div>

      {/* Main Form Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px]"
      >
        <div className="glass-card rounded-2xl p-8 sm:p-10 relative overflow-hidden">
          {/* Subtle Glow Effect inside the card */}
          <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/10 rounded-full blur-[64px] pointer-events-none" />
          
          <div className="flex flex-col space-y-2 text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {children}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-muted-foreground/60 max-w-sm mx-auto">
          By continuing, you agree to our Terms of Service and Privacy Policy. Securely powered by advanced ATS intelligence.
        </div>
      </motion.div>
    </div>
  );
}
