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

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <HeroSection />
      <ForWhomSection />
      <BenefitsSection />
      <LearningProcessSection />
      <ProgramSection />
      <ComparePlansSection />
      <TestimonialsSection />
      <FaqSection />
      <FooterSection />
    </main>
  );
}
