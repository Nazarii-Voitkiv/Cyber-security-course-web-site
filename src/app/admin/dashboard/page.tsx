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
import { useEffect } from 'react';
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

    // Логаут
    const handleLogout = () => {
        document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/admin');
    };

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

                <div className="space-y-8">
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
            </div>
        </section>
    );
}
