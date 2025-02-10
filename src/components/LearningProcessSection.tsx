'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RocketLaunchIcon, ClockIcon, DevicePhoneMobileIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import CustomMarkdown from "@/utils/CustomMarkdown";

interface FeatureItem {
    title: string;
    description: string;
}

interface StepItem {
    number: string;
    title: string;
    description: string;
}

interface LearningProcessData {
    title: string;
    subtitle: string;
    features: FeatureItem[];
    processSteps: StepItem[];
}

export default function LearningProcessSection() {
    const [data, setData] = useState<LearningProcessData | null>(null);

    useEffect(() => {
        fetch('/api/learningprocess/get')
            .then((r) => r.json())
            .then((json) => {
                if (json.success) {
                    setData(json.data);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    if (!data) return null;

    return (
        <section className="py-16 relative overflow-hidden">
            <div className="matrix-grid" />
            <div className="glitch-overlay" />
            
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        <CustomMarkdown>{data.title}</CustomMarkdown>
                    </h2>
                    <p className="text-lg text-cyan-100 max-w-2xl mx-auto">
                        <CustomMarkdown>{data.subtitle}</CustomMarkdown>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {data.features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                            style={{
                                transform: 'translate3d(0, 0, 0)',
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                perspective: 1000,
                                WebkitPerspective: 1000,
                            }}
                        >
                            <div className="cyber-card p-6 h-full neon-border-minimal border-cyan-500/20">
                                <div className="text-cyan-400/90 mb-4">
                                    {index === 0 && <DevicePhoneMobileIcon className="h-8 w-8" />}
                                    {index === 1 && <ClockIcon className="h-8 w-8" />}
                                    {index === 2 && <AcademicCapIcon className="h-8 w-8" />}
                                    {index === 3 && <RocketLaunchIcon className="h-8 w-8" />}
                                </div>
                                <h3 className="text-xl font-bold mb-2"><CustomMarkdown>{feature.title}</CustomMarkdown></h3>
                                <p className="text-gray-400"><CustomMarkdown>{feature.description}</CustomMarkdown></p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.processSteps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                            style={{
                                transform: 'translate3d(0, 0, 0)',
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                perspective: 1000,
                                WebkitPerspective: 1000,
                            }}
                        >
                            <div className="cyber-card p-6 h-full neon-border-minimal border-cyan-500/20">
                                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400/90 to-blue-500/90 mb-4">
                                    <CustomMarkdown>{step.number}</CustomMarkdown>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white"><CustomMarkdown>{step.title}</CustomMarkdown></h3>
                                <p className="text-cyan-100"><CustomMarkdown>{step.description}</CustomMarkdown></p>
                            </div>
                            {index < data.processSteps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-cyan-500/30" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}