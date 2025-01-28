'use client';

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
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <HeroSection />
      <IntroSection />
      <WhyThisCourseSection />
      <BenefitsSection />
      <ForWhomSection />
      <LearningProcessSection />
      <ProgramSection />
      <ComparePlansSection />
      <TestimonialsSection />
      <FaqSection />
      <FooterSection />
    </main>
  );
}
