'use client';

import HeroEdit from '@/app/admin/components/HeroEdit';
import IntroEdit from '@/app/admin/components/IntroEdit';
import WhyThisCourseEdit from '@/app/admin/components/WhyThisCourseEdit';
import BenefitsEdit from '@/app/admin/components/BenefitsEdit';
import ForWhomEdit from '@/app/admin/components/ForWhomEdit';
import LearningProcessEdit from '@/app/admin/components/LearningProcessEdit';
import ProgramEdit from '@/app/admin/components/ProgramEdit';
import ComparePlansEdit from '@/app/admin/components/ComparePlansEdit';
import TestimonialsEdit from '@/app/admin/components/TestimonialsEdit';
import FaqEdit from '@/app/admin/components/FaqEdit';
import FooterEdit from '@/app/admin/components/FooterEdit';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
    const router = useRouter();

    // Перевірка авторизації (кукі isAuthenticated=true)
    useEffect(() => {
        const isAuthenticated = document.cookie.includes('isAuthenticated=true');
        if (!isAuthenticated) {
            router.push('/admin/login');
        }
    }, [router]);

    const [loadingHero, setLoadingHero] = useState(true);
    const [loadingIntro, setLoadingIntro] = useState(true);

    // ===== 1. Завантажити Hero
    useEffect(() => {
        fetch('/api/hero/get')
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    setLoadingHero(false);
                }
            })
            .catch((error) => {
                console.error(error);
                setLoadingHero(false);
            });
    }, []);

    // ===== 2. Завантажити Intro
    useEffect(() => {
        fetch('/api/intro/get')
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    setLoadingIntro(false);
                }
            })
            .catch((error) => {
                console.error(error);
                setLoadingIntro(false);
            });
    }, []);

    // Логаут
    const handleLogout = () => {
        document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/admin');
    };

    if (loadingHero || loadingIntro) {
        return <div className="text-center py-10 text-cyan-200">Завантаження...</div>;
    }

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 py-10">
                <div className="flex justify-between mb-8">
                    <h1 className="text-3xl font-bold text-cyan-400">Адмін-панель</h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Вийти
                    </motion.button>
                </div>

                {/* ============== HERO FORM ============== */}
                <HeroEdit />

                {/* ============== INTRO FORM ============== */}
                <IntroEdit />

                {/* ============== WHY THIS COURSE FORM ============== */}
                <WhyThisCourseEdit />

                {/* ============== BENEFITS FORM ============== */}
                <BenefitsEdit />

                {/* ============== FOR WHOM FORM ============== */}
                <ForWhomEdit />

                {/* ============== LEARNING PROCESS FORM ============== */}
                <LearningProcessEdit />

                {/* ============== PROGRAM FORM ============== */}
                <ProgramEdit />

                {/* ============== COMPARE PLANS FORM ============== */}
                <ComparePlansEdit />

                {/* ============== TESTIMONIALS FORM ============== */}
                <TestimonialsEdit />

                {/* ============== FAQ FORM ============== */}
                <FaqEdit />

                {/* ============== FOOTER FORM ============== */}
                <FooterEdit />
            </div>
        </section>
    );
}
