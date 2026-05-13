import React, { useState, useRef } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../auth/utils/cn";

const FileUpload = ({ value, onChange, error, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      // Handled by parent validation usually, but good to have here
      return;
    }
    onChange(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative group cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 min-h-[180px]",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : value
            ? "border-success/50 bg-success/5"
            : "border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5",
          error && "border-destructive bg-destructive/5"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFile(e.target.files?.[0])}
          accept=".pdf"
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {value ? (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <FileText size={32} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground max-w-[200px] truncate">
                  {value.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(value.size / (1024 * 1024)).toFixed(2)} MB • PDF
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                }}
                className="text-xs font-medium text-destructive hover:underline flex items-center gap-1"
              >
                <X size={14} /> Remove file
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="no-file"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="p-3 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Upload size={32} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF only (max. 5MB)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-destructive flex items-center gap-1.5 font-medium"
        >
          <AlertCircle size={14} /> {error}
        </motion.p>
      )}
    </div>
  );
};

export { FileUpload };
