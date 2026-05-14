import React from "react";
import { motion } from "framer-motion";
import { FileText, Briefcase, UserCircle, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export const HeroDashboard = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-[2000px]">
      
      {/* Glow Behind */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-[100px] rounded-full" />

      <div className="relative w-full max-w-lg aspect-square" style={{ transformStyle: "preserve-3d" }}>
        
        {/* CARD 1: Background Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10, rotateY: -15, z: -100 }}
          animate={{ opacity: 1, y: 0, rotateX: 15, rotateY: -20, z: -50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 m-auto w-[85%] h-[75%] rounded-3xl border border-white/10 bg-[#0B1120]/80 backdrop-blur-2xl shadow-2xl p-6 overflow-hidden left-0 top-0"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-300">Upload Your Details</h3>
            
            <div className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/5">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                <FileText size={18} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-200">Resume.pdf</div>
                <div className="text-xs text-slate-500">2.4 MB</div>
              </div>
              <CheckCircle2 size={16} className="text-blue-400" />
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/5">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Briefcase size={18} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-200">Job Description</div>
                <div className="text-xs text-slate-500">Frontend Developer at Google</div>
              </div>
              <CheckCircle2 size={16} className="text-blue-400" />
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/5">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <UserCircle size={18} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-200">Self Description</div>
                <div className="text-xs text-slate-500">Senior Frontend Engineer...</div>
              </div>
              <CheckCircle2 size={16} className="text-blue-400" />
            </div>
            
          </div>
        </motion.div>

        {/* CARD 2: AI Analysis Summary (Middle Layer) */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 5, rotateY: -5, z: 0 }}
          animate={{ opacity: 1, y: 40, rotateX: 10, rotateY: -10, z: 50 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="absolute inset-0 m-auto w-[90%] h-[70%] rounded-3xl border border-white/10 bg-[#071224]/90 backdrop-blur-2xl shadow-2xl p-6 left-10 top-16"
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-sm font-semibold text-slate-300">AI Analysis Summary</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Circular Progress */}
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
                <motion.circle
                  initial={{ strokeDasharray: "251.2", strokeDashoffset: "251.2" }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * 85) / 100 }}
                  transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                  cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent"
                  className="text-blue-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-white">85<span className="text-sm">%</span></span>
                <span className="text-[10px] text-slate-400">Match Score</span>
              </div>
            </div>

            {/* Bars */}
            <div className="flex flex-col gap-3 justify-center">
              {[
                { label: "Skills Match", value: 90 },
                { label: "Experience", value: 80 },
                { label: "Education", value: 85 }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{stat.label}</span>
                    <span>{stat.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2 text-blue-400">
              <AlertCircle size={14} />
              <span className="text-xs font-semibold">Needs Improvement</span>
            </div>
            <ul className="text-[10px] text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Add more System Design context</li>
              <li>Include leadership metrics</li>
            </ul>
          </div>
        </motion.div>

        {/* CARD 3: Floating Interview Report Card (Top Layer) */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute right-[-20%] top-[-10%] w-[60%] z-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
            className="rounded-2xl border border-white/20 bg-gradient-to-b from-[#1a2035] to-[#0f172a] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full" />
            
            <h4 className="text-xs font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-blue-400" />
              Top Strengths
            </h4>
            
            <div className="flex flex-col gap-2">
              {['React.js', 'System Architecture', 'UI/UX Design'].map((skill, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                  <span className="text-xs text-slate-300">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroDashboard;
