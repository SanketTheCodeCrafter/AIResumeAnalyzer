import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

export const ProductShowcase = () => {
  return (
    <section id="showcase" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SectionHeading 
          title="See AI in Action" 
          subtitle="From upload to interview-ready insights in seconds."
        />

        <div className="mt-16 flex flex-col lg:flex-row gap-8 items-center justify-center">
          
          {/* Card 1: Upload */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/3 flex flex-col gap-4"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0B1120] overflow-hidden shadow-2xl">
              {/* Browser Header */}
              <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              {/* Fake UI */}
              <div className="p-6 h-[250px] flex flex-col gap-4">
                 <div className="w-1/2 h-4 bg-white/10 rounded-md" />
                 <div className="flex-1 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center bg-white/5">
                   <div className="flex flex-col items-center gap-2">
                     <div className="w-10 h-10 rounded-full bg-blue-500/20" />
                     <div className="w-24 h-2 bg-white/20 rounded-full" />
                   </div>
                 </div>
              </div>
            </div>
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold mb-2">1</span>
              <h4 className="text-slate-200 font-medium">Upload Details</h4>
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="hidden lg:block text-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>

          {/* Card 2: Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/3 flex flex-col gap-4"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0B1120] overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-blue-500/5" />
              {/* Browser Header */}
              <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 relative z-10">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              {/* Fake UI */}
              <div className="p-6 h-[250px] flex items-center gap-6 relative z-10">
                 <div className="w-24 h-24 rounded-full border-4 border-blue-500/30 border-t-blue-500 flex items-center justify-center">
                   <span className="text-2xl font-bold text-white">85%</span>
                 </div>
                 <div className="flex-1 flex flex-col gap-4">
                   <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden"><div className="w-[90%] h-full bg-blue-500" /></div>
                   <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden"><div className="w-[75%] h-full bg-purple-500" /></div>
                   <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden"><div className="w-[85%] h-full bg-indigo-500" /></div>
                 </div>
              </div>
            </div>
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-bold mb-2">2</span>
              <h4 className="text-slate-200 font-medium">AI Analysis</h4>
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="hidden lg:block text-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>

          {/* Card 3: Report */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-1/3 flex flex-col gap-4"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0B1120] overflow-hidden shadow-2xl">
              {/* Browser Header */}
              <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              {/* Fake UI */}
              <div className="p-6 h-[250px] flex flex-col gap-4">
                 <div className="w-3/4 h-6 bg-white/10 rounded-md mb-2" />
                 <div className="flex gap-4">
                    <div className="flex-1 bg-white/5 rounded-lg p-3 flex flex-col gap-2">
                      <div className="w-full h-2 bg-white/20 rounded-full" />
                      <div className="w-5/6 h-2 bg-white/10 rounded-full" />
                    </div>
                    <div className="flex-1 bg-white/5 rounded-lg p-3 flex flex-col gap-2">
                      <div className="w-full h-2 bg-white/20 rounded-full" />
                      <div className="w-5/6 h-2 bg-white/10 rounded-full" />
                    </div>
                 </div>
                 <div className="w-full flex-1 bg-white/5 rounded-lg mt-2" />
              </div>
            </div>
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-bold mb-2">3</span>
              <h4 className="text-slate-200 font-medium">Interview Report</h4>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
