import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { FEATURES_DATA } from "../constants/landingData";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";

export const FeaturesGrid = () => {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SectionHeading 
          title="Powerful Features" 
          subtitle="Everything you need to ace your next interview"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-16">
          {FEATURES_DATA.map((feature, index) => {
            const IconComponent = Icons[feature.icon] || Icons.CheckCircle;
            
            let colSpan = "md:col-span-2 lg:col-span-2";
            let colStart = "";
            
            if (index === 3) {
              colStart = "lg:col-start-2";
            } else if (index === 4) {
              colStart = "md:col-start-2 lg:col-start-auto";
            }

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`h-full ${colSpan} ${colStart}`}
              >
                <GlowCard className="flex flex-col h-full p-8 group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={28} strokeWidth={1.5} />
                    </div>
                    {feature.comingSoon && (
                      <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed flex-1">
                    {feature.description}
                  </p>

                  {/* Decorative Elements based on feature */}
                  {index === 0 && (
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                       <div className="flex gap-1">
                         {[1,2,3,4,5].map(i => (
                           <div key={i} className={`w-1.5 rounded-full ${i <= 4 ? 'bg-blue-500 h-6' : 'bg-white/10 h-3'}`} />
                         ))}
                       </div>
                       <div className="text-3xl font-black text-white">85<span className="text-sm text-slate-500">%</span></div>
                    </div>
                  )}
                  {index === 1 && (
                     <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center">
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                           <div className="w-[70%] h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                        </div>
                     </div>
                  )}
                  {index === 2 && (
                    <div className="mt-8 pt-6 border-t border-white/5 relative h-16 w-full flex items-center justify-center overflow-hidden">
                       <div className="absolute w-24 h-24 border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                       <div className="absolute w-16 h-16 border border-purple-500/20 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
                       <Icons.Target className="text-blue-400 w-6 h-6" />
                    </div>
                  )}
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturesGrid;
