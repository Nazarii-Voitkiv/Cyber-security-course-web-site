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
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-gray-900 text-white"
      >
        <AnimationWrapper>
          <HeroSection />
        </AnimationWrapper>
        
        <AnimationWrapper>
          <IntroSection />
        </AnimationWrapper>
        
        <AnimationWrapper>
          <WhyThisCourseSection />
        </AnimationWrapper>
        
        <AnimationWrapper>
          <BenefitsSection />
        </AnimationWrapper>
        
        <AnimationWrapper>
          <ForWhomSection />
        </AnimationWrapper>
        
        <AnimationWrapper>
          <LearningProcessSection />
        </AnimationWrapper>
        
        <AnimationWrapper>
          <ProgramSection />
        </AnimationWrapper>
        
        <AnimationWrapper>
          <ComparePlansSection />
        </AnimationWrapper>
        
        <AnimationWrapper>
          <TestimonialsSection />
        </AnimationWrapper>
        
        <AnimationWrapper>
          <FaqSection />
        </AnimationWrapper>
        
        <AnimationWrapper>
          <FooterSection />
        </AnimationWrapper>
      </motion.main>
    </AnimatePresence>
  );
}