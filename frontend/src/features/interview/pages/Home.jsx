import React, { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { Button } from "../../auth/components/Button.jsx";
import InterviewForm from "../components/InterviewForm.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard, Sparkles } from "lucide-react";

function Home() {
  const { authState, logout } = useAuth();
  const { user } = authState;
  const [report, setReport] = useState(null);

  const handleSuccess = (reportData) => {
    setReport(reportData);
    // You could navigate to a separate report page here
    // or show it inline below.
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Navigation Header */}
      <header className="border-b border-border/40 bg-background/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary p-1.5 rounded-lg">
              <Sparkles className="text-primary-foreground" size={20} />
            </div>
            <span>AI Resume <span className="text-primary text-opacity-80">Analyzer</span></span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-sm font-medium">{user?.username || "Guest User"}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Premium Plan</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout} 
              className="gap-2 rounded-xl border-border/60 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20 transition-all"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-2 shadow-sm"
          >
            <Sparkles size={14} className="mr-2" />
            AI-Powered Interview Preparation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Master Your Next <span className="text-primary">Interview</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Upload your resume and the job description. Our AI will analyze both to generate
            tailored interview questions, feedback, and success strategies.
          </motion.p>
        </section>

        <AnimatePresence mode="wait">
          {!report ? (
            <InterviewForm key="form" onSuccess={handleSuccess} />
          ) : (
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 rounded-3xl border border-success/20 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={40} />
              </div>
              <h2 className="text-3xl font-bold">Report Generated!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your AI-powered interview guide is ready. We've analyzed your profile against the job requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/20">
                  View Full Report
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setReport(null)}
                  className="rounded-xl px-8"
                >
                  Analyze New Resume
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}

export default Home;
