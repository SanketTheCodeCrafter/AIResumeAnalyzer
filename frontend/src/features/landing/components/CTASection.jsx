import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] overflow-hidden"
        >
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-blue-900/40" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          
          <div className="relative border border-white/10 bg-[#0B1120]/60 backdrop-blur-3xl px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="flex items-start gap-8 max-w-2xl">
               <div className="hidden md:flex w-20 h-20 rounded-2xl bg-white/5 border border-white/10 items-center justify-center text-blue-400 shrink-0">
                 <Rocket size={40} />
               </div>
               <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    Your Dream Job Awaits. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Let AI Help You Get There.</span>
                  </h2>
                  <p className="text-lg text-slate-400">
                    Start your AI-powered interview preparation now.
                  </p>
               </div>
            </div>

            <Link
              to="/register"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white rounded-full bg-blue-600 overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all shrink-0 w-full md:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Analyze Resume Free</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
