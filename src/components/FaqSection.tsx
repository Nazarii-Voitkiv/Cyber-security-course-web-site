'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { usePageData } from '@/contexts/PageDataContext';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqData {
  faqs: FaqItem[];
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { pageData } = usePageData();
  const faqData = pageData.faq as unknown;

  if (!faqData) return null;

  const isFaqData = (data: unknown): data is FaqData => {
    if (typeof data !== 'object' || data === null) return false;
    
    const obj = data as Record<string, unknown>;
    return (
      Array.isArray(obj.faqs) &&
      obj.faqs.every(item => {
        if (typeof item !== 'object' || item === null) return false;
        const faq = item as Record<string, unknown>;
        return (
          typeof faq.question === 'string' &&
          typeof faq.answer === 'string'
        );
      })
    );
  };

  if (!isFaqData(faqData)) {
    console.error("FAQ data structure is invalid");
    return null;
  }

  const data: FaqData = faqData;

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
            Часті запитання
          </h2>
          <p className="text-xl text-gray-400">
            Відповіді на популярні запитання про наш курс
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {data.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left"
              >
                <div className="p-6 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl 
                              transition-all duration-300 hover:border-cyan-500/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white pr-8">
                      {faq.question}
                    </h3>
                    <ChevronDownIcon 
                      className={`h-6 w-6 text-cyan-400 transition-transform duration-300 flex-shrink-0
                                ${openIndex === index ? 'rotate-180' : ''}`}
                    />
                  </div>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-gray-400 border-t border-gray-700 pt-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}