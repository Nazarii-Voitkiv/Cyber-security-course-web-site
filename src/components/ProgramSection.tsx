'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import CustomMarkdown from "@/utils/CustomMarkdown";
import { usePageData } from '@/contexts/PageDataContext';

interface Module {
    id: number;
    title: string;
    description: string;
    topics: string[];
}

interface ProgramData {
    title: string;
    subtitle: string;
    modules: Module[];
}

export default function ProgramSection() {
    const { pageData } = usePageData();
    const programData = pageData.program as unknown;
    const [openModule, setOpenModule] = useState<number | null>(null);

    if (!programData) return null;

    const isProgramData = (data: unknown): data is ProgramData => {
        if (typeof data !== 'object' || data === null) return false;
        
        const obj = data as Record<string, unknown>;
        return (
            typeof obj.title === 'string' &&
            typeof obj.subtitle === 'string' &&
            Array.isArray(obj.modules)
        );
    };

    if (!isProgramData(programData)) {
        console.error("Program data structure is invalid");
        return null;
    }

    const data: ProgramData = programData;

    return (
        <section className="py-20 bg-gray-800/50">
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
                    <p className="text-xl text-gray-400">
                        <CustomMarkdown>{data.subtitle}</CustomMarkdown>
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {data.modules.map((module) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <button
                                onClick={() => setOpenModule(openModule === module.id ? null : module.id)}
                                className="w-full text-left"
                            >
                                <div className="p-6 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl 
                                          transition-all duration-300 hover:border-cyan-500/50">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-semibold text-white">
                                                <span className="whitespace-normal break-words">
                                                    Модуль {module.id} - {module.title}
                                                </span>
                                            </h3>
                                            <p className="text-gray-400 mt-1"><CustomMarkdown>{module.description}</CustomMarkdown></p>
                                        </div>
                                        <ChevronDownIcon 
                                            className={`h-6 w-6 shrink-0 text-cyan-400 transition-transform duration-300 
                                                    ${openModule === module.id ? 'rotate-180' : ''}`}
                                        />
                                    </div>

                                    <AnimatePresence>
                                        {openModule === module.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <ul className="mt-4 space-y-2 border-t border-gray-700 pt-4">
                                                    {module.topics.map((topic, index) => (
                                                        <motion.li
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="flex items-center text-gray-300"
                                                        >
                                                            <div className="h-2 w-2 rounded-full bg-cyan-400 mr-3" />
                                                            <CustomMarkdown>{topic}</CustomMarkdown>
                                                        </motion.li>
                                                    ))}
                                                </ul>
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