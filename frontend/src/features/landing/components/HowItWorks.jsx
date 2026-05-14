import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { HOW_IT_WORKS_DATA } from "../constants/landingData";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SectionHeading 
          title="How It Works" 
          subtitle="Simple steps to supercharge your interview preparation"
        />

        <div className="grid md:grid-cols-3 gap-8 relative mt-16">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0" />

          {HOW_IT_WORKS_DATA.map((step, index) => {
            const IconComponent = Icons[step.icon] || Icons.Circle;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <GlowCard className="flex flex-col items-center text-center p-8 h-full overflow-visible">
                  {/* Step Number Circle */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0B1120] border-2 border-blue-500 flex items-center justify-center text-lg font-bold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    {step.step}
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 mt-4">
                    <IconComponent size={32} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
