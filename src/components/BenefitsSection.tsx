'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,             // Cybersecurity
  BanknotesIcon,               // Monetizing knowledge
  LightBulbIcon,               // Clear explanations
  IdentificationIcon,          // Overcoming fraud fears
  ClipboardDocumentCheckIcon,  // Tests for checking knowledge
  CalendarIcon                 // Limited-time learning access
} from '@heroicons/react/24/outline';
import CustomMarkdown from "@/utils/CustomMarkdown";

const benefits = [
  {
    Icon: ShieldCheckIcon,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10'
  },
  {
    Icon: BanknotesIcon,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    Icon: LightBulbIcon,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10'
  },
  {
    Icon: IdentificationIcon,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  },
  {
    Icon: ClipboardDocumentCheckIcon,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10'
  },
  {
    Icon: CalendarIcon,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10'
  }
];

interface BenefitsData {
  title: string;
  benefits: {
    title: string;
    description: string;
  }[];
}

export default function BenefitsSection() {
  const [data, setData] = useState<BenefitsData | null>(null);

  useEffect(() => {
    fetch('/api/benefits/get')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setData(data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!data) return null;

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            <CustomMarkdown>{data.title}</CustomMarkdown>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {data.benefits.map((benefit, index) => {
            const { Icon, color, bgColor } = benefits[index];
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group h-full"
              >
                <div className="p-8 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl
                             transition-transform duration-300 group-hover:scale-[1.02] h-full flex flex-col">
                  <div className={`${bgColor} p-4 rounded-full w-fit mb-6 
                                transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
                    <Icon className={`h-8 w-8 ${color}`} />
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-white flex-shrink-0"><CustomMarkdown>{benefit.title}</CustomMarkdown></h3>
                  <p className="text-gray-400 flex-grow"><CustomMarkdown>{benefit.description}</CustomMarkdown></p>
                </div>

                {/* Subtle glow effect on hover */}
                <div className={`absolute -inset-0.5 ${bgColor} opacity-0 group-hover:opacity-20 
                              rounded-xl blur transition duration-300`} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}