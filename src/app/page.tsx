'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import HeroSection from '@/components/HeroSection';
import ForWhomSection from '@/components/ForWhomSection';
import BenefitsSection from '@/components/BenefitsSection';
import LearningProcessSection from '@/components/LearningProcessSection';
import ProgramSection from '@/components/ProgramSection';
import ComparePlansSection from '@/components/ComparePlansSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import FooterSection from '@/components/FooterSection';
import IntroSection from '@/components/IntroSection';
import WhyThisCourseSection from '@/components/WhyThisCourseSection';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    
    <AnimatePresence>
      {isLoaded && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-gray-900 text-white"
        >
          <AnimationWrapper>
            <HeroSection />
          </AnimationWrapper>
          
          <AnimationWrapper delay={0.1}>
            <IntroSection />
          </AnimationWrapper>
          
          <AnimationWrapper delay={0.2}>
            <WhyThisCourseSection />
          </AnimationWrapper>
          
          <AnimationWrapper delay={0.3}>
            <BenefitsSection />
          </AnimationWrapper>
          
          <AnimationWrapper delay={0.4}>
            <ForWhomSection />
          </AnimationWrapper>
          
          <AnimationWrapper delay={0.5}>
            <LearningProcessSection />
          </AnimationWrapper>
          
          <AnimationWrapper delay={0.6}>
            <ProgramSection />
          </AnimationWrapper>
          
          <AnimationWrapper delay={0.7}>
            <ComparePlansSection />
          </AnimationWrapper>
          
          <AnimationWrapper delay={0.8}>
            <TestimonialsSection />
          </AnimationWrapper>
          
          <AnimationWrapper delay={0.9}>
            <FaqSection />
          </AnimationWrapper>
          
          <AnimationWrapper delay={1}>
            <FooterSection />
          </AnimationWrapper>
        </motion.main>
      )}
    </AnimatePresence>
  );
}