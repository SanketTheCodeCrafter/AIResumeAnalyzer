import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Sparkles, Send, BrainCircuit, ClipboardList } from "lucide-react";

import { interviewSchema } from "../validation/interview.validation";
import { generateInterviewReport } from "../services/interview.api";
import { Label } from "../../auth/components/Label";
import { Button } from "../../auth/components/Button";
import { Textarea } from "./Textarea";
import { FileUpload } from "./FileUpload";

const InterviewForm = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      selfDescription: "",
      jobDescription: "",
      resume: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const promise = generateInterviewReport(data);

      toast.promise(promise, {
        loading: "Analyzing your resume with AI...",
        success: (response) => {
          reset();
          if (onSuccess) onSuccess(response.data);
          return "Interview report generated successfully!";
        },
        error: (err) => err.message || "Failed to generate report",
      });

      await promise;
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="glass-card p-8 rounded-3xl border border-primary/10 shadow-2xl overflow-hidden relative group">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Generate AI Interview Guide</h2>
            <p className="text-muted-foreground text-sm">Fill in the details below to get a personalized preparation report.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Descriptions */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="selfDescription" className="flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" /> Self Description
                  </Label>
                </div>
                <Textarea
                  id="selfDescription"
                  placeholder="Talk about your experience, key achievements, and what makes you a great candidate..."
                  {...control.register("selfDescription")}
                  className={errors.selfDescription ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.selfDescription && (
                  <p className="text-xs text-destructive font-medium">{errors.selfDescription.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="jobDescription" className="flex items-center gap-2">
                    <ClipboardList size={14} className="text-primary" /> Job Description
                  </Label>
                </div>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job requirements, responsibilities, and company details here..."
                  {...control.register("jobDescription")}
                  className={errors.jobDescription ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.jobDescription && (
                  <p className="text-xs text-destructive font-medium">{errors.jobDescription.message}</p>
                )}
              </div>
            </div>

            {/* Right Column: Resume Upload */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 mb-2">
                <Send size={14} className="rotate-45 text-primary" /> Upload Resume
              </Label>
              <Controller
                name="resume"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.resume?.message}
                  />
                )}
              />

              <div className="p-4 rounded-xl bg-muted/50 border border-muted-foreground/10 text-xs text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground mb-1 flex items-center gap-1">
                  💡 Pro Tip
                </p>
                Ensure your resume is in PDF format and contains clear text for the AI to parse accurately. Detailed descriptions lead to better interview questions.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50 flex justify-end">
            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              className="w-full md:w-auto min-w-[200px] gap-2 rounded-xl h-12 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 active:scale-[0.98]"
            >
              {!isSubmitting && <Sparkles size={18} />}
              Generate Report
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default InterviewForm;
