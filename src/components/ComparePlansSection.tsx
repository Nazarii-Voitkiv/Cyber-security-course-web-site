'use client';

import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePageData } from '@/contexts/PageDataContext';
import CustomMarkdown from "@/utils/CustomMarkdown";

interface ComparePlansData {
    title: string;
    specialOfferBanner: string;
    leadMagnet: string;
    introBonus?: string;
    featuresTitle?: string;
    plans: {
        title: string;
        description: string;
        originalPrice: string;
        price: string;
        discount: string;
        features: string[];
        recommended?: boolean;
        link: string;
    }[];
    featuresComparison: {
        name: string;
        basic: boolean | string;
        full: boolean | string;
    }[];
}

export default function ComparePlansSection() {
    const { pageData } = usePageData();
    const comparePlansData = pageData.comparePlans as unknown;

    if (!comparePlansData) return null;

    const isComparePlansData = (data: unknown): data is ComparePlansData => {
        if (typeof data !== 'object' || data === null) return false;
        
        const obj = data as Record<string, unknown>;
        
        return (
            typeof obj.title === 'string' &&
            typeof obj.specialOfferBanner === 'string' &&
            typeof obj.leadMagnet === 'string' &&
            Array.isArray(obj.plans) &&
            Array.isArray(obj.featuresComparison)
        );
    };

    if (!isComparePlansData(comparePlansData)) {
        console.error("ComparePlans data structure is invalid");
        return null;
    }

    const data: ComparePlansData = comparePlansData;
    
    if (!data.plans || data.plans.length === 0) return null;

    const getGridCols = (count: number) => {
        if (count === 1) return 'md:grid-cols-1 max-w-xl mx-auto';
        if (count === 2) return 'md:grid-cols-2 gap-6 md:gap-8';
        if (count === 3) return 'md:grid-cols-3 gap-6 md:gap-8';
        return 'md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8';
    };

    return (
        <section id="compare-plans" className="py-16 relative overflow-hidden">
            <div className="matrix-grid" />
            <div className="glitch-overlay" />
            
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                    >
                        <CustomMarkdown>{data.title}</CustomMarkdown>
                    </motion.h2>

                    {data.introBonus && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-3xl mx-auto mb-8"
                        >
                            <p className="text-lg text-cyan-100"><CustomMarkdown>{data.introBonus}</CustomMarkdown></p>
                        </motion.div>
                    )}
                    
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        whileHover={{
                            scale: 1.03,
                            rotate: [0, -1, 1, -1, 0],
                            transition: { rotate: { repeat: Infinity, duration: 0.5 } }
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block mb-12"
                    >
                        <div className="relative discount-button bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-full text-base md:text-xl font-bold shadow-lg shadow-red-500/20 cursor-pointer hover:shadow-xl hover:shadow-red-500/30 transition-shadow duration-300">
                            <CustomMarkdown>{data.specialOfferBanner}</CustomMarkdown>
                        </div>
                    </motion.div>
                </div>

                <div className={`grid ${getGridCols(data.plans.length)} max-w-7xl mx-auto`}>
                    {data.plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="relative pt-6 h-full"
                        >
                            {plan.recommended && (
                                <div className="absolute top-0 inset-x-0 flex justify-center">
                                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold z-10 shadow-lg">
                                        Рекомендовано
                                    </div>
                                </div>
                            )}
                            
                            <div className={`h-full cyber-card p-6 md:p-8 rounded-xl flex flex-col neon-border ${plan.recommended ? 'border-cyan-500/30' : 'border-gray-700/30'}`}>
                                <h3 className="text-xl md:text-2xl font-bold mb-2">
                                    <CustomMarkdown>{plan.title}</CustomMarkdown>
                                </h3>
                                <p className="text-gray-400 mb-4 text-sm md:text-base flex-grow">
                                    <CustomMarkdown>{plan.description}</CustomMarkdown>
                                </p>

                                <div className="mb-6">
                                    <div className="flex items-center justify-center gap-3 mb-2">
                                        <span className="text-gray-400 line-through text-base md:text-lg">
                                            <CustomMarkdown>{plan.originalPrice}</CustomMarkdown>
                                        </span>
                                        <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs md:text-sm font-bold shadow-lg shadow-red-500/20">
                                            -<CustomMarkdown>{plan.discount}</CustomMarkdown>
                                        </span>
                                    </div>
                                    <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-center">
                                        <CustomMarkdown>{plan.price}</CustomMarkdown>
                                    </div>
                                </div>

                                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-sm md:text-base">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start text-cyan-100">
                                            <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-cyan-400 mt-2 mr-2 md:mr-3 flex-shrink-0" />
                                            <span><CustomMarkdown>{feature}</CustomMarkdown></span>
                                        </li>
                                    ))}
                                </ul>

                                <motion.a
                                    href={plan.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="cyber-button w-full py-3 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg mt-auto text-center"
                                >
                                    Почати навчання
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {data.featuresComparison && data.featuresComparison.length > 0 && (
                    <div className="mt-20">
                        <h3 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            {data.featuresTitle || "Порівняння тарифів"}
                        </h3>

                        <div className="overflow-x-auto max-w-6xl mx-auto">
                            <div className="min-w-[768px]">
                                <div className="grid grid-cols-3 bg-gray-800/50 rounded-t-lg p-4 mb-2">
                                    <div className="text-cyan-100 font-bold">Функції</div>
                                    <div className="text-cyan-100 font-bold text-center">Базовий план</div>
                                    <div className="text-cyan-100 font-bold text-center">Повний курс</div>
                                </div>

                                {data.featuresComparison.map((feature, idx) => (
                                    <motion.div 
                                        key={idx} 
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={`grid grid-cols-3 p-4 ${idx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}`}
                                    >
                                        <div className="text-gray-300">{feature.name}</div>
                                        <div className="flex justify-center">
                                            {typeof feature.basic === 'boolean' ? (
                                                feature.basic ? 
                                                    <CheckIcon className="h-6 w-6 text-green-500" /> : 
                                                    <XMarkIcon className="h-6 w-6 text-red-500" />
                                            ) : (
                                                <span className="text-cyan-400">{feature.basic}</span>
                                            )}
                                        </div>
                                        <div className="flex justify-center">
                                            {typeof feature.full === 'boolean' ? (
                                                feature.full ? 
                                                    <CheckIcon className="h-6 w-6 text-green-500" /> : 
                                                    <XMarkIcon className="h-6 w-6 text-red-500" />
                                            ) : (
                                                <span className="text-cyan-400">{feature.full}</span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 mb-8 relative group max-w-3xl mx-auto"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative bg-gray-900/90 border-2 border-cyan-500/50 rounded-lg p-6 backdrop-blur-sm">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                            БОНУС
                        </div>
                        <div className="text-center text-lg md:text-xl text-white">
                            <CustomMarkdown>{data.leadMagnet}</CustomMarkdown>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}