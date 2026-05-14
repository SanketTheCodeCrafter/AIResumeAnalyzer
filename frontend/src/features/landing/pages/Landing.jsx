import React from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import FeaturesGrid from "../components/FeaturesGrid";
import ProductShowcase from "../components/ProductShowcase";
import WhyChooseUs from "../components/WhyChooseUs";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 font-sans selection:bg-blue-500/30">
      <AnimatedBackground />
      <Navbar />
      
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturesGrid />
        <ProductShowcase />
        <WhyChooseUs />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
