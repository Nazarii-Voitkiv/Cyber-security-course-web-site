'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ComparePlansData {
    title: string;
    specialOfferBanner: string;
    featuresTitle: string;
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
    const [data, setData] = useState<ComparePlansData | null>(null);

    useEffect(() => {
        fetch('/api/compareplans/get')
            .then((r) => r.json())
            .then((json) => {
                if (json.success) {
                    setData(json.data);
                }
            })
            .catch((err) => {
                console.error('Error loading compare plans data:', err);
            });
    }, []);

    if (!data) return null;

    return (
        <section id="compare-plans" className="py-16 relative overflow-hidden">
            {/* Кібер-елементи */}
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
                        {data.title}
                    </motion.h2>

                    <motion.button
                        onClick={() => {
                            const element = document.getElementById('compare-plans');
                            element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ 
                            scale: 1.05,
                            rotate: [0, -1, 1, -1, 0],
                            transition: {
                                rotate: {
                                    repeat: Infinity,
                                    duration: 0.5
                                }
                            }
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ 
                            delay: 0.2,
                            type: "spring",
                            stiffness: 300,
                            damping: 15 
                        }}
                        className="relative discount-button bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-full text-base md:text-xl font-bold mb-6 shadow-lg shadow-red-500/20 cursor-pointer hover:shadow-xl hover:shadow-red-500/30 transition-shadow duration-300"
                    >
                        {data.specialOfferBanner}
                    </motion.button>

                    {/* Таймер */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <CountdownTimer />
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {data.plans.map((plan, index) => (
                        <motion.div
                            key={plan.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative cursor-pointer"
                            // ТУТ: Викликаємо подію "Lead" при кліку на всю картку
                            onClick={() => {
                                if (typeof window !== 'undefined' && window.fbq) {
                                    window.fbq('track', 'Lead', {
                                        content_name: plan.title,
                                        currency: 'UAH',
                                        value: parseFloat(plan.price.replace(' ₴', ''))
                                    });
                                }
                                // Переходимо за лінком
                                window.open(plan.link, '_blank', 'noopener,noreferrer');
                            }}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap shadow-lg z-10">
                                    Рекомендовано
                                </div>
                            )}

                            <div className={`cyber-card p-6 md:p-8 rounded-xl h-full flex flex-col neon-border
                                ${plan.recommended ? 'border-cyan-500/30' : 'border-gray-700/30'}`}>

                                <h3 className="text-xl md:text-2xl font-bold mb-2">{plan.title}</h3>
                                <p className="text-gray-400 mb-4 text-sm md:text-base">{plan.description}</p>

                                <div className="mb-6">
                                    <div className="flex items-center justify-center gap-3 mb-2">
                                        <span className="text-gray-400 line-through text-base md:text-lg">
                                            {plan.originalPrice}
                                        </span>
                                        <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs md:text-sm font-bold shadow-lg shadow-red-500/20">
                                            -{plan.discount}
                                        </span>
                                    </div>
                                    <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                        {plan.price}
                                    </div>
                                </div>

                                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow text-sm md:text-base">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-cyan-100">
                                            <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-cyan-400 mr-2 md:mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* КНОПКА */}
                                <motion.a
                                    href={plan.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // Тут: stopPropagation, щоб не викликати onClick батька
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (typeof window !== 'undefined' && window.fbq) {
                                            window.fbq('track', 'Lead', {
                                                content_name: plan.title,
                                                currency: 'UAH',
                                                value: parseFloat(plan.price.replace(' ₴', ''))
                                            });
                                        }
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cyber-button w-full py-3 rounded-full text-base font-semibold shadow-lg text-center"
                                >
                                    Почати навчання
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Таблиця порівняння */}
                <div className="border border-gray-700 rounded-xl overflow-hidden mt-12">
                    {/* Заголовки курсів */}
                    <div className="grid grid-cols-3 gap-2 md:gap-8 bg-gray-800">
                        <div className="col-span-1 p-2 md:p-4 border-r border-gray-700"></div>
                        <div className="col-span-1 p-2 md:p-4 text-center border-r border-gray-700">
                            <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-sm md:text-base whitespace-normal">
                                {data.plans[0].title}
                            </h3>
                        </div>
                        <div className="col-span-1 p-2 md:p-4 text-center">
                            <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-sm md:text-base">
                                {data.plans[1].title}
                            </h3>
                        </div>
                    </div>

                    {data.featuresComparison.map((feature, index) => (
                        <div 
                            key={feature.name}
                            className={`grid grid-cols-3 gap-2 md:gap-8 ${
                                index % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-900/50'
                            }`}
                        >
                            <div className="col-span-1 p-2 md:p-4 border-r border-gray-700">
                                <span className="text-gray-300 text-xs md:text-base">{feature.name}</span>
                            </div>
                            <div className="col-span-1 p-2 md:p-4 text-center border-r border-gray-700">
                                {typeof feature.basic === 'boolean' ? (
                                    feature.basic ? (
                                        <CheckIcon className="h-4 w-4 md:h-6 md:w-6 text-green-400 mx-auto" />
                                    ) : (
                                        <XMarkIcon className="h-4 w-4 md:h-6 md:w-6 text-gray-500 mx-auto" />
                                    )
                                ) : (
                                    <span className="text-gray-300 text-xs md:text-base">{feature.basic}</span>
                                )}
                            </div>
                            <div className="col-span-1 p-2 md:p-4 text-center">
                                {typeof feature.full === 'boolean' ? (
                                    feature.full ? (
                                        <CheckIcon className="h-4 w-4 md:h-6 md:w-6 text-green-400 mx-auto" />
                                    ) : (
                                        <XMarkIcon className="h-4 w-4 md:h-6 md:w-6 text-gray-500 mx-auto" />
                                    )
                                ) : (
                                    <span className="text-gray-300 text-xs md:text-base">{feature.full}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Додаткова інформація */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-gray-400 text-sm text-center mt-8"
                >
                    * Після оплати ви отримаєте доступ через Telegram-бот протягом 5 хвилин
                </motion.p>
            </div>
        </section>
    );
}
