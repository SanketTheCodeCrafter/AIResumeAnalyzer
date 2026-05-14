import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "../../auth/components/Button.jsx";

export function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-card w-full max-w-md rounded-2xl border border-border/50 shadow-2xl p-6 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-destructive/60" />
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-destructive/10 text-destructive rounded-full shrink-0 mt-1">
                                <AlertTriangle size={24} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold tracking-tight">Sign out</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Are you sure you want to sign out? You will need to sign in again to access your interview reports.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end mt-8">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="rounded-xl"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={onConfirm}
                                className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Sign out
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
