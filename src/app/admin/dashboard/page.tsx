'use client';

import HeroEdit from '@/app/admin/components/HeroEdit';
import IntroEdit from '@/app/admin/components/IntroEdit';
import WhyThisCourseEdit from '@/app/admin/components/WhyThisCourseEdit';
import BenefitsEdit from '@/app/admin/components/BenefitsEdit';
import ForWhomEdit from '@/app/admin/components/ForWhomEdit';
import LearningProcessEdit from '@/app/admin/components/LearningProcessEdit';
import ProgramEdit from '@/app/admin/components/ProgramEdit';
import ComparePlansEdit from '@/app/admin/components/ComparePlansEdit';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Типи для Hero
interface CourseType {
    title: string;
    description: string;
    originalPrice: string;
    price: string;
    discount: string;
    recommended?: boolean;
    features: string[];
    link: string;
}

interface HeroData {
    heroTitle: string;
    heroSubtitle: string;
    discountBanner: string;
    courseTypes: CourseType[];
}

// Типи для Intro
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

export default function Dashboard() {
    const router = useRouter();

    // Перевірка авторизації (кукі isAuthenticated=true)
    useEffect(() => {
        const isAuthenticated = document.cookie.includes('isAuthenticated=true');
        if (!isAuthenticated) {
            router.push('/admin');
        }
    }, [router]);

    // Hero state
    const [hero, setHero] = useState<HeroData | null>(null);
    const [, setHeroMessage] = useState('');

    // Intro state
    const [intro, setIntro] = useState<IntroData | null>(null);
    const [, setIntroMessage] = useState('');

    const [loadingHero, setLoadingHero] = useState(true);
    const [loadingIntro, setLoadingIntro] = useState(true);

    // ===== 1. Завантажити Hero
    useEffect(() => {
        fetch('/api/hero/get')
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    setHero(data.data);
                }
                setLoadingHero(false);
            })
            .catch((err) => {
                console.error(err);
                setLoadingHero(false);
            });
    }, []);

    // ===== 2. Завантажити Intro
    useEffect(() => {
        fetch('/api/intro/get')
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    setIntro(data.data);
                }
                setLoadingIntro(false);
            })
            .catch((err) => {
                console.error(err);
                setLoadingIntro(false);
            });
    }, []);

    // ===== 3. Зберегти Hero
    const saveHero = async () => {
        if (!hero) return;
        setHeroMessage('');

        try {
            const res = await fetch('/api/hero/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hero)
            });
            const data = await res.json();
            if (data.success) {
                setHeroMessage('Hero збережено успішно!');
            } else {
                setHeroMessage('Помилка збереження Hero.');
            }
        } catch (error) {
            console.error(error);
            setHeroMessage('Щось пішло не так при збереженні Hero...');
        }
    };

    // ===== 4. Зберегти Intro
    const saveIntro = async () => {
        if (!intro) return;
        setIntroMessage('');

        try {
            const res = await fetch('/api/intro/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(intro)
            });
            const data = await res.json();
            if (data.success) {
                setIntroMessage('Intro збережено успішно!');
            } else {
                setIntroMessage('Помилка збереження Intro.');
            }
        } catch (error) {
            console.error(error);
            setIntroMessage('Щось пішло не так при збереженні Intro...');
        }
    };

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
            </div>
        </section>
    );
}
