import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";

export const GlowCard = ({ children, className, containerClassName }) => {
  return (
    <motion.div
      whileHover={{ translateY: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("group relative", containerClassName)}
    >
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-3xl bg-blue-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className={cn(
        "relative h-full w-full rounded-3xl border border-white/10 bg-[#0B1120]/80 backdrop-blur-xl p-6 overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500",
        className
      )}>
        {children}
      </div>
    </motion.div>
  );
};

export default GlowCard;
