'use client';

import HeroSection from '@/components/HeroSection';
import ComparePlansSection from '@/components/ComparePlansSection';
import LearningProcessSection from '@/components/LearningProcessSection';
import ForWhomSection from '@/components/ForWhomSection';
import BenefitsSection from '@/components/BenefitsSection';
import ProgramSection from '@/components/ProgramSection';
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
      <FaqSection />
      <FooterSection />
    </main>
  );
}
