'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);
  
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  
  const opacity = useTransform(scrollY, [0, windowHeight * 0.8, windowHeight], [0, 0, 1]);
  const translateY = useTransform(scrollY, [0, windowHeight * 0.8, windowHeight], [-100, -100, 0]);

  const scrollToPlans = (e: React.MouseEvent) => {
    e.preventDefault();
    const plansSection = document.getElementById('compare-plans');
    if (plansSection) {
      plansSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToHero = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.nav
      style={{ opacity, translateY }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center h-10 space-x-2 cursor-pointer"
            onClick={scrollToHero}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShieldCheckIcon className="h-8 w-8 text-cyan-400" />
            <span className="text-lg font-bold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Курс з кібербезпеки
            </span>
          </motion.div>

          <motion.button
            onClick={scrollToPlans}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cyber-button h-10 px-6 rounded-full text-sm font-semibold shadow-lg flex items-center justify-center"
          >
            Отримати курс
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}