import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, ChevronRight, LayoutDashboard } from "lucide-react";

import { getInterviewReport } from "../services/interview.api";
import ReportSidebar from "../components/report/ReportSidebar";
import ReportHeader from "../components/report/ReportHeader";
import MatchScoreCard from "../components/report/MatchScoreCard";
import TechnicalQuestionCard from "../components/report/TechnicalQuestionCard";
import SkillGapCard from "../components/report/SkillGapCard";
import PreparationPlanCard from "../components/report/PreparationPlanCard";
import EmptyState from "../components/report/EmptyState";
import { Button } from "../../auth/components/Button";
import { cn } from "../../auth/utils/cn";

const Interview = () => {
    const { interviewId } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState("technical");

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true);
                const response = await getInterviewReport(interviewId);
                setReport(response.data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message || "Failed to load report");
            } finally {
                setLoading(false);
            }
        };

        if (interviewId) fetchReport();
    }, [interviewId]);

    // Scroll Spy logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["technical", "behavioral", "roadmap"];
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-primary"
                >
                    <Loader2 size={48} />
                </motion.div>
                <p className="text-muted-foreground animate-pulse font-medium">Crunching AI analysis...</p>
            </div>
        );
    }

    if (error || !report) {
        return (
            <div className="min-h-screen bg-background p-6">
                <EmptyState type={error ? "error" : "empty"} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            {/* Background blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">
                    <Link to="/interview" className="hover:text-primary transition-colors flex items-center gap-1.5">
                        <LayoutDashboard size={14} /> Dashboard
                    </Link>
                    <ChevronRight size={12} />
                    <span className="text-foreground">Interview Report</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Sidebar */}
                    <ReportSidebar activeSection={activeSection} />

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-16">
                        <ReportHeader title={report.title} />

                        <section id="overview">
                            <MatchScoreCard score={report.matchScore} />
                        </section>

                        {/* Technical Questions */}
                        <section id="technical" className="space-y-8 scroll-mt-24">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm">01</span>
                                    Technical Deep Dive
                                </h2>
                                <p className="text-muted-foreground text-sm">Core concepts and coding challenges expected for this role.</p>
                            </div>
                            <div className="grid gap-4">
                                {report.technicalQuestions?.map((q, i) => (
                                    <TechnicalQuestionCard key={i} question={q} index={i} />
                                ))}
                            </div>
                        </section>

                        {/* Behavioral Questions */}
                        <section id="behavioral" className="space-y-8 scroll-mt-24">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center text-sm">02</span>
                                    Behavioral & Culture Fit
                                </h2>
                                <p className="text-muted-foreground text-sm">Situational questions designed to test your soft skills and experience.</p>
                            </div>
                            <div className="grid gap-4">
                                {report.behaviouralQuestions?.map((q, i) => (
                                    <TechnicalQuestionCard key={i} question={q} index={i} isBehavioral />
                                ))}
                            </div>
                        </section>

                        {/* Preparation Roadmap */}
                        <section id="roadmap" className="space-y-8 scroll-mt-24">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-success/10 text-success flex items-center justify-center text-sm">03</span>
                                    7-Day Success Roadmap
                                </h2>
                                <p className="text-muted-foreground text-sm">A step-by-step plan to prepare you for the upcoming interview.</p>
                            </div>
                            <div className="space-y-2">
                                {report.preparationPlan?.map((plan, i) => (
                                    <PreparationPlanCard key={i} plan={plan} index={i} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <aside className="w-full lg:w-80 shrink-0 space-y-8 lg:sticky lg:top-24 lg:h-fit">
                        <div className="flex flex-col gap-2 mb-2 px-1">
                            <h3 className="text-lg font-bold tracking-tight">Critical Insights</h3>
                            <p className="text-xs text-muted-foreground">Key areas to address before your interview.</p>
                        </div>
                        <SkillGapCard skillGaps={report.skillGaps} />
                    </aside>
                </div>
            </main>

            {/* Mobile Sticky Footer Nav */}
            <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] glass-card rounded-2xl border border-border/50 p-2 flex justify-around items-center shadow-2xl z-50">
                <button onClick={() => document.getElementById('technical')?.scrollIntoView({ behavior: 'smooth' })} className={cn("p-3 rounded-xl transition-colors", activeSection === 'technical' ? 'bg-primary/10 text-primary' : 'text-muted-foreground')}>
                    <LayoutDashboard size={20} />
                </button>
                <button onClick={() => document.getElementById('behavioral')?.scrollIntoView({ behavior: 'smooth' })} className={cn("p-3 rounded-xl transition-colors", activeSection === 'behavioral' ? 'bg-primary/10 text-primary' : 'text-muted-foreground')}>
                    <AlertCircle size={20} />
                </button>
                <button onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })} className={cn("p-3 rounded-xl transition-colors", activeSection === 'roadmap' ? 'bg-primary/10 text-primary' : 'text-muted-foreground')}>
                    <ChevronRight size={20} className="rotate-90" />
                </button>
            </nav>
        </div>
    );
};

export default Interview;