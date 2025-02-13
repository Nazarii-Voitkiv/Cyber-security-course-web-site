'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import CountdownTimer from './CountdownTimer';
import CustomMarkdown from "@/utils/CustomMarkdown";

export interface CourseType {
    title: string;
    description: string;
    originalPrice: string;
    price: string;
    discount: string;
    recommended?: boolean;
    features: string[];
    link: string;
}

export interface HeroData {
    heroTitle: string;
    heroSubtitle: string;
    discountBanner: string;
    courseTypes: CourseType[];
    leadMagnet: string;
}

export default function HeroSection() {
    const [data, setData] = useState<HeroData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/hero/get')
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    setData(json.data);
                } else {
                    setError('Не вдалося завантажити Hero-дані');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Помилка завантаження Hero');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return null;
    }

    if (error) {
        return <div className="text-center py-10 text-red-400">{error}</div>;
    }

    if (!data) {
        return null;
    }

    const { heroTitle, heroSubtitle, discountBanner, courseTypes } = data;

    return (
        <section id="hero-section" className="relative min-h-screen cyber-background">
            <div className="matrix-grid" />
            <div className="glitch-overlay" />

            <div className="container mx-auto px-4 py-8 relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0, type: "spring", stiffness: 200 }}
                        className="mb-8"
                    >
                        <ShieldCheckIcon className="h-16 w-16 md:h-20 md:w-20 mx-auto text-cyan-400" />
                    </motion.div>

                    <h1
                        className="font-bold mb-6 md:mb-8 lg:mb-10 text-transparent bg-clip-text
                       bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400
                       animate-gradient text-[2.5rem] sm:text-[3rem] md:text-[5rem] lg:text-[72px]
                       leading-snug sm:leading-tight max-w-3xl mx-auto"
                    >
                        <CustomMarkdown>{heroTitle}</CustomMarkdown>
                    </h1>

                    <p className="text-lg md:text-xl text-cyan-100 mb-8 md:mb-12 max-w-2xl mx-auto">
                        <CustomMarkdown>{heroSubtitle}</CustomMarkdown>
                    </p>

                    <motion.button
                        onClick={() => {
                            const element = document.getElementById('hero-section');
                            element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
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
                            delay: 0.4,
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        }}
                        className="relative discount-button bg-gradient-to-r from-red-500 via-pink-500 to-red-500
                       text-white py-2 md:py-3 px-4 md:px-6 rounded-full text-base md:text-xl font-bold
                       mb-6 md:mb-8 inline-block shadow-lg shadow-red-500/20 cursor-pointer
                       hover:shadow-xl hover:shadow-red-500/30 transition-shadow duration-300"
                    >
                        <CustomMarkdown>{discountBanner}</CustomMarkdown>
                    </motion.button>

                    <div className="mb-8">
                        <CountdownTimer />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8">
                        {courseTypes.map((course: CourseType, index: number) => (
                            <motion.div
                                key={course.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative pt-6 cursor-pointer md:col-span-2 md:max-w-xl md:mx-auto w-full"
                                onClick={() => {
                                    if (typeof window !== 'undefined' && window.fbq) {
                                        window.fbq('track', 'Lead', {
                                            content_name: course.title,
                                            currency: 'UAH',
                                            value: parseFloat(course.price.replace(' ₴', ''))
                                        });
                                    }
                                    window.open(course.link, '_blank', 'noopener,noreferrer');
                                }}
                            >
                                {course.recommended && (
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500
                                 text-black px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap
                                 shadow-lg z-10"
                                    >
                                        Рекомендовано
                                    </div>
                                )}
                                <div className={`cyber-card p-6 md:p-8 rounded-xl h-full flex flex-col neon-border
                                    ${course.recommended ? 'border-cyan-500/30' : 'border-gray-700/30'}`}>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2"><CustomMarkdown>{course.title}</CustomMarkdown></h3>
                                    <p className="text-gray-400 mb-4 text-sm md:text-base"><CustomMarkdown>{course.description}</CustomMarkdown></p>

                                    <div className="mb-6">
                                        <div className="flex items-center justify-center gap-3 mb-2">
                                            <span className="text-gray-400 line-through text-base md:text-lg">
                                                <CustomMarkdown>{course.originalPrice}</CustomMarkdown>
                                            </span>
                                            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs md:text-sm font-bold shadow-lg shadow-red-500/20">
                                                -<CustomMarkdown>{course.discount}</CustomMarkdown>
                                            </span>
                                        </div>
                                        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-center">
                                            <CustomMarkdown>{course.price}</CustomMarkdown>
                                        </div>
                                    </div>

                                    <ul className="text-left space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow text-sm md:text-base">
                                        {course.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-cyan-100">
                                                <div className="h-1.5 w-1.5 md:h-2 md:w-2 aspect-square rounded-full bg-cyan-400 mr-2 md:mr-3" />
                                                <CustomMarkdown>{feature}</CustomMarkdown>
                                            </li>
                                        ))}
                                    </ul>

                                    <motion.a
                                        href={course.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (typeof window !== 'undefined' && window.fbq) {
                                                window.fbq('track', 'Lead', {
                                                    content_name: course.title,
                                                    currency: 'UAH',
                                                    value: parseFloat(course.price.replace(' ₴', ''))
                                                });
                                            }
                                        }}
                                        className="cyber-button w-full py-3 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg text-center"
                                    >
                                        Почати навчання
                                    </motion.a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 mb-8 relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative bg-gray-900/90 border-2 border-cyan-500/50 rounded-lg p-6 backdrop-blur-sm">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                            ПОДАРУНОК
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