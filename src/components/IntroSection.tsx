'use client';

import { motion } from 'framer-motion';
import CustomMarkdown from "@/utils/CustomMarkdown";
import { usePageData } from '@/contexts/PageDataContext';

interface IntroData {
    mainTitle: string;
    mainSubtitle: string;
    paragraphs: string[];
    points: Array<{
        title: string;
        description: string;
    }>;
    conclusion: string;
}

export default function IntroSection() {
    const { pageData } = usePageData();
    const introData = pageData.intro as unknown;

    if (!introData) return null;

    const isIntroData = (data: unknown): data is IntroData => {
        if (typeof data !== 'object' || data === null) return false;
        
        const obj = data as Record<string, unknown>;
        return (
            typeof obj.mainTitle === 'string' &&
            typeof obj.mainSubtitle === 'string' &&
            Array.isArray(obj.paragraphs) &&
            Array.isArray(obj.points) &&
            typeof obj.conclusion === 'string'
        );
    };

    if (!isIntroData(introData)) {
        console.error("Intro data structure is invalid");
        return null;
    }

    const intro: IntroData = introData;

    return (
        <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800">
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
                        <div className="space-y-6 mb-8">
                            {intro.paragraphs.map((paragraph, idx) => (
                                <p key={idx} className={`${idx === 0 ? "text-lg text-cyan-100" : "text-gray-400"}`}>
                                    <CustomMarkdown>{paragraph}</CustomMarkdown>
                                </p>
                            ))}
                        </div>

                        <div className="space-y-6 mb-8">
                            {intro.points.map((point, idx) => (
                                <motion.div 
                                    key={idx} 
                                    className="flex items-start"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-2">
                                            <CustomMarkdown>{point.title}</CustomMarkdown>
                                        </h3>
                                        <p className="text-gray-400"><CustomMarkdown>{point.description}</CustomMarkdown></p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{opacity: 0, x: -50}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{type: "spring", stiffness: 100, damping: 20}}
                            viewport={{once: true}} 
                            className={`${intro.points.length > 0 ? "pt-8 border-t border-gray-700" : ""}`}
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