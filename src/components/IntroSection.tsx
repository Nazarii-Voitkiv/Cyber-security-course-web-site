'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CustomMarkdown from "@/utils/CustomMarkdown";

interface IntroPoint {
    title: string;
    description: string;
}

interface IntroData {
    mainTitle: string;
    mainSubtitle: string;
    paragraphs: string[];
    points: IntroPoint[];
    conclusion: string;
}

export default function IntroSection() {
    const [intro, setIntro] = useState<IntroData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/intro/get')
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    setIntro(json.data);
                } else {
                    setError('Не вдалося завантажити Intro');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Помилка завантаження Intro');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return null;
    }

    if (error) {
        return <div className="text-center py-10 text-red-400">{error}</div>;
    }

    if (!intro) {
        return null;
    }

    return (
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Кібер-ефекти */}
        <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />

        <div className="container mx-auto px-4 relative">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text animate-gradient">
                <CustomMarkdown>{intro.mainTitle}</CustomMarkdown>
            </h2>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
                <CustomMarkdown>{intro.mainSubtitle}</CustomMarkdown>
            </p>
          </motion.div>

          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto space-y-8"
          >
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
              <p className="text-lg text-cyan-100 mb-6"> <CustomMarkdown>{intro.paragraphs[0]}</CustomMarkdown> </p>

              <p className="text-gray-400 mb-8"><CustomMarkdown>{intro.paragraphs[1]}</CustomMarkdown></p>

                <ul className="space-y-6">
                    {intro.points.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-2">
                                    <CustomMarkdown>{point.title}</CustomMarkdown>
                                </h3>
                                <p className="text-gray-400"><CustomMarkdown>{point.description}</CustomMarkdown></p>
                            </div>
                        </li>
                    ))}
                </ul>

              <motion.div
                  initial={{opacity: 0, x: -100}}
                  whileInView={{opacity: 1, x: 0}}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.8
                  }}
                  viewport={{once: true}} // Додано цей параметр
                  className="mt-8 pt-8 border-t border-gray-700"
              >
                <p className="text-xl font-semibold text-red-400">
                    <CustomMarkdown>{intro.conclusion}</CustomMarkdown>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
  );
}
