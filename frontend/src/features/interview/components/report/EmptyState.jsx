import React from "react";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../auth/components/Button";

const EmptyState = ({ type = "empty" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6"
      >
        <Search size={32} className="text-muted-foreground" />
      </motion.div>
      <h2 className="text-2xl font-bold mb-2">
        {type === "error" ? "Something went wrong" : "Report not found"}
      </h2>
      <p className="text-muted-foreground max-w-sm mb-8">
        {type === "error" 
          ? "We couldn't retrieve your interview analysis. Please try refreshing the page." 
          : "We couldn't find the interview report you're looking for. It might have been deleted."}
      </p>
      <Link to="/interview">
        <Button variant="outline" className="rounded-xl gap-2">
          <ArrowLeft size={16} />
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
