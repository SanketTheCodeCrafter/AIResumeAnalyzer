import React, { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { Button } from "../../auth/components/Button.jsx";
import InterviewForm from "../components/forms/InterviewForm.jsx";
import { motion } from "framer-motion";
import { LogOut, Sparkles } from "lucide-react";
import RecentReports from "../components/reports/RecentReports.jsx";
import { LogoutConfirmModal } from "../components/LogoutConfirmModal.jsx";

/* ── Home Page ───────────────────────────────────────────────
 *  Thin page shell.
 *  Renders the navigation header and the InterviewForm.
 *  No business logic — that lives in useInterview() via the form.
 * ─────────────────────────────────────────────────────────── */

function Home() {
    const { authState, logout } = useAuth();
    const { user } = authState;
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowLogoutConfirm(true)}
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
                        Drop your resume and the job description below to instantly unlock personalized interview strategies, technical deep-dives, and a 7-day success roadmap.
                    </motion.p>
                </section>

                <InterviewForm key="form" />

                {/* Reports Listing Section */}
                <RecentReports />
            </div>

            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            {/* Logout Confirmation Modal */}
            <LogoutConfirmModal
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={() => {
                    setShowLogoutConfirm(false);
                    logout();
                }}
            />
        </main>
    );
}

export default Home;
