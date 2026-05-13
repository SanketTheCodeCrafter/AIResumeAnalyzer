import React from "react";
import { motion } from "framer-motion";
import { Code2, Users, Route, Home, ChevronRight } from "lucide-react";
import { cn } from "../../../auth/utils/cn";
import { Link } from "react-router-dom";

const navItems = [
  { id: "technical", label: "Technical Questions", icon: Code2, color: "text-blue-500" },
  { id: "behavioral", label: "Behavioral Questions", icon: Users, color: "text-amber-500" },
  { id: "roadmap", label: "Preparation Roadmap", icon: Route, color: "text-success" },
];

const ReportSidebar = ({ activeSection }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 h-[calc(100vh-8rem)] sticky top-24">
      <div className="glass-card flex flex-col h-full rounded-2xl border border-border/50 p-4 overflow-hidden relative group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-50" />
        
        <div className="px-2 mb-8">
          <Link to="/interview" className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors group/back">
            <Home size={14} className="group-hover/back:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
        </div>

        <nav className="space-y-1.5 flex-1">
          <div className="px-3 mb-4">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Report Navigation</span>
          </div>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group/nav",
                  isActive 
                    ? "bg-primary/10 border border-primary/20 text-primary shadow-sm" 
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground border border-transparent"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    isActive ? "bg-primary/20" : "bg-muted group-hover/nav:bg-background"
                  )}>
                    <Icon size={18} className={cn(isActive ? "text-primary" : item.color)} />
                  </div>
                  <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="active-indicator">
                    <ChevronRight size={14} />
                  </motion.div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-[10px] font-medium leading-relaxed text-muted-foreground">
            Our AI analyzed 20+ interview sources to generate these questions specifically for your profile.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default ReportSidebar;
