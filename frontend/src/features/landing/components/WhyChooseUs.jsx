import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { WHY_CHOOSE_US_DATA } from "../constants/landingData";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";

export const WhyChooseUs = () => {
  return (
    <section id="benefits" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SectionHeading 
          title="Why Choose AI Resume Analyzer?" 
        />

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {WHY_CHOOSE_US_DATA.map((benefit, index) => {
            const IconComponent = Icons[benefit.icon] || Icons.CheckCircle;

            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlowCard className="flex items-start gap-6 p-8">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                    <IconComponent size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">{benefit.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
