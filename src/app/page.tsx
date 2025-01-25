'use client';

import { motion } from 'framer-motion';
import { ShieldCheckIcon, LockClosedIcon, UserGroupIcon, UserIcon, HomeIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import HeroSection from '@/components/HeroSection';
import ForWhomSection from '@/components/ForWhomSection';
import BenefitsSection from '@/components/BenefitsSection';
import ProgramSection from '@/components/ProgramSection';
import ComparePlansSection from '@/components/ComparePlansSection';
import FaqSection from '@/components/FaqSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <HeroSection />
      <ForWhomSection />
      <BenefitsSection />
      <ProgramSection />
      <ComparePlansSection />
      <FaqSection />
      <FooterSection />
    </main>
  );
}
