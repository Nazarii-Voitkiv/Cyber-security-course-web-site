'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Інтерфейси
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

interface PageContent {
    hero: HeroData;
    intro: IntroData;
}

export default function Dashboard() {
    const router = useRouter();

    // Авторизація
    useEffect(() => {
        const isAuthenticated = document.cookie.includes('isAuthenticated=true');
        if (!isAuthenticated) {
            router.push('/admin');
        }
    }, [router]);

    const [pageData, setPageData] = useState<PageContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // 1. Завантажити повний об'єкт PageContent (hero, intro)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/hero-content/get');
                const data = await res.json();
                if (data.success) {
                    setPageData(data.data); // <- { hero: {...}, intro: {...} }
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 2. Зберегти (POST)
    const handleSave = async () => {
        if (!pageData) return;
        setMessage('');

        try {
            const res = await fetch('/api/hero-content/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pageData),
            });
            const json = await res.json();
            if (json.success) {
                setMessage('Зміни успішно збережено!');
            } else {
                setMessage('Помилка збереження. Перевірте консоль.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Щось пішло не так...');
        }
    };

    // 3. Зміна полів Hero
    const handleHeroChange = (field: keyof HeroData, value: string) => {
        if (!pageData) return;
        setPageData({
            ...pageData,
            hero: {
                ...pageData.hero,
                [field]: value,
            },
        });
    };

    // 4. Зміна курсу в Hero
    const handleCourseChange = (
        courseIndex: number,
        field: keyof CourseType,
        value: CourseType[keyof CourseType]
    ) => {
        if (!pageData) return;
        const updatedCourses = [...pageData.hero.courseTypes];
        updatedCourses[courseIndex] = {
            ...updatedCourses[courseIndex],
            [field]: value,
        };
        setPageData({
            ...pageData,
            hero: {
                ...pageData.hero,
                courseTypes: updatedCourses,
            },
        });
    };

    // 5. Зміна полів Intro (title, subtitle, conclusion, etc.)
    const handleIntroChange = (field: keyof IntroData, value: string | string[]) => {
        if (!pageData) return;
        setPageData({
            ...pageData,
            intro: {
                ...pageData.intro,
                [field]: value,
            },
        });
    };

    // 6. Зміна point-ів Intro
    const handleIntroPointChange = (
        index: number,
        field: keyof IntroPoint,
        value: string
    ) => {
        if (!pageData) return;
        const updatedPoints = [...pageData.intro.points];
        updatedPoints[index] = {
            ...updatedPoints[index],
            [field]: value,
        };
        setPageData({
            ...pageData,
            intro: {
                ...pageData.intro,
                points: updatedPoints,
            },
        });
    };

    // 7. Зміна окремих абзаців paragraphs (якщо треба)
    const handleParagraphChange = (index: number, value: string) => {
        if (!pageData) return;
        const updatedParagraphs = [...pageData.intro.paragraphs];
        updatedParagraphs[index] = value;
        setPageData({
            ...pageData,
            intro: {
                ...pageData.intro,
                paragraphs: updatedParagraphs,
            },
        });
    };

    // Вихід (Logout)
    const handleLogout = () => {
        document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/admin');
    };

    if (loading) {
        return <div className="text-center py-10 text-cyan-200">Завантаження даних...</div>;
    }

    return (
        <section className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')]" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />

            <div className="container mx-auto px-4 relative py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Шапка Dashboard */}
                    <div className="flex justify-between items-center mb-12 p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Панель управління
                        </h1>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="px-6 py-2 bg-red-500/20 border border-red-400 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors"
                        >
                            Вийти
                        </motion.button>
                    </div>

                    {/* Форма редагування */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm"
                    >
                        <h2 className="text-2xl font-semibold mb-8 text-cyan-100">
                            Редагування контенту
                        </h2>

                        {/* Повідомлення про збереження */}
                        {message && (
                            <div className="mb-4 p-2 text-center bg-gray-700 text-green-400 rounded">
                                {message}
                            </div>
                        )}

                        {!pageData ? (
                            <p className="text-gray-400">Не вдалося завантажити дані...</p>
                        ) : (
                            <div className="space-y-8">

                                {/* ========== Hero Section ========== */}
                                <details className="bg-gray-700/30 border border-gray-600 rounded-lg p-4" open>
                                    <summary className="cursor-pointer text-cyan-100 text-xl font-bold mb-4">
                                        Hero Section
                                    </summary>

                                    <div className="mt-4 space-y-6">
                                        {/* Hero Title */}
                                        <div>
                                            <label className="block text-cyan-100 mb-2">Заголовок (heroTitle):</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={pageData.hero.heroTitle}
                                                onChange={(e) => handleHeroChange('heroTitle', e.target.value)}
                                            />
                                        </div>

                                        {/* Hero Subtitle */}
                                        <div>
                                            <label className="block text-cyan-100 mb-2">Підзаголовок (heroSubtitle):</label>
                                            <textarea
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-20"
                                                value={pageData.hero.heroSubtitle}
                                                onChange={(e) => handleHeroChange('heroSubtitle', e.target.value)}
                                            />
                                        </div>

                                        {/* Discount Banner */}
                                        <div>
                                            <label className="block text-cyan-100 mb-2">Текст акції (discountBanner):</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={pageData.hero.discountBanner}
                                                onChange={(e) => handleHeroChange('discountBanner', e.target.value)}
                                            />
                                        </div>

                                        {/* Courses */}
                                        <details className="bg-gray-700/20 border border-gray-600 rounded-lg p-4">
                                            <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                                                Список курсів
                                            </summary>
                                            <div className="mt-4 space-y-4">
                                                {pageData.hero.courseTypes.map((course, idx) => (
                                                    <div key={idx} className="p-4 border border-gray-600 rounded bg-gray-700/40">
                                                        <div className="mb-2">
                                                            <label className="block text-cyan-100">Назва (title):</label>
                                                            <input
                                                                type="text"
                                                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                                                                value={course.title}
                                                                onChange={(e) => handleCourseChange(idx, 'title', e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="mb-2">
                                                            <label className="block text-cyan-100">Опис (description):</label>
                                                            <textarea
                                                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white h-20"
                                                                value={course.description}
                                                                onChange={(e) => handleCourseChange(idx, 'description', e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="flex flex-wrap gap-4 mb-2">
                                                            <div>
                                                                <label className="block text-cyan-100">Стара ціна (originalPrice):</label>
                                                                <input
                                                                    type="text"
                                                                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                                                                    value={course.originalPrice}
                                                                    onChange={(e) =>
                                                                        handleCourseChange(idx, 'originalPrice', e.target.value)
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-cyan-100">Нова ціна (price):</label>
                                                                <input
                                                                    type="text"
                                                                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                                                                    value={course.price}
                                                                    onChange={(e) => handleCourseChange(idx, 'price', e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-cyan-100">Знижка (discount):</label>
                                                                <input
                                                                    type="text"
                                                                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                                                                    value={course.discount}
                                                                    onChange={(e) => handleCourseChange(idx, 'discount', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="mb-2">
                                                            <label className="block text-cyan-100">Посилання (link):</label>
                                                            <input
                                                                type="text"
                                                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                                                                value={course.link}
                                                                onChange={(e) => handleCourseChange(idx, 'link', e.target.value)}
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="flex items-center text-cyan-100">
                                                                <input
                                                                    type="checkbox"
                                                                    className="mr-2"
                                                                    checked={course.recommended || false}
                                                                    onChange={(e) =>
                                                                        handleCourseChange(idx, 'recommended', e.target.checked)
                                                                    }
                                                                />
                                                                Рекомендовано (recommended)
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </details>
                                    </div>
                                </details>

                                {/* ========== Intro Section ========== */}
                                <details className="bg-gray-700/30 border border-gray-600 rounded-lg p-4" open>
                                    <summary className="cursor-pointer text-cyan-100 text-xl font-bold mb-4">
                                        Intro Section
                                    </summary>

                                    <div className="mt-4 space-y-6">
                                        {/* mainTitle */}
                                        <div>
                                            <label className="block text-cyan-100 mb-2">Заголовок (mainTitle):</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={pageData.intro.mainTitle}
                                                onChange={(e) => handleIntroChange('mainTitle', e.target.value)}
                                            />
                                        </div>

                                        {/* mainSubtitle */}
                                        <div>
                                            <label className="block text-cyan-100 mb-2">Підзаголовок (mainSubtitle):</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={pageData.intro.mainSubtitle}
                                                onChange={(e) => handleIntroChange('mainSubtitle', e.target.value)}
                                            />
                                        </div>

                                        {/* paragraphs */}
                                        <details className="bg-gray-700/20 border border-gray-600 rounded-lg p-4">
                                            <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                                                Абзаци (paragraphs)
                                            </summary>
                                            <div className="mt-4 space-y-4">
                                                {pageData.intro.paragraphs.map((paragraph, idx) => (
                                                    <div key={idx}>
                                                        <label className="block text-cyan-100">Абзац {idx + 1}:</label>
                                                        <textarea
                                                            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white h-20"
                                                            value={paragraph}
                                                            onChange={(e) => handleParagraphChange(idx, e.target.value)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </details>

                                        {/* points */}
                                        <details className="bg-gray-700/20 border border-gray-600 rounded-lg p-4">
                                            <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                                                Пункти (points)
                                            </summary>
                                            <div className="mt-4 space-y-4">
                                                {pageData.intro.points.map((p, idx) => (
                                                    <div key={idx} className="p-4 border border-gray-600 rounded bg-gray-800/50">
                                                        <div className="mb-2">
                                                            <label className="block text-cyan-100">Заголовок (title):</label>
                                                            <input
                                                                type="text"
                                                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                                                                value={p.title}
                                                                onChange={(e) => handleIntroPointChange(idx, 'title', e.target.value)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-cyan-100">Опис (description):</label>
                                                            <textarea
                                                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white h-20"
                                                                value={p.description}
                                                                onChange={(e) =>
                                                                    handleIntroPointChange(idx, 'description', e.target.value)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </details>

                                        {/* conclusion */}
                                        <div>
                                            <label className="block text-cyan-100 mb-2">Висновок (conclusion):</label>
                                            <textarea
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-20"
                                                value={pageData.intro.conclusion}
                                                onChange={(e) => handleIntroChange('conclusion', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </details>

                                {/* Кнопка збереження */}
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleSave}
                                    className="px-6 py-2 bg-cyan-500 border border-cyan-400 rounded-lg text-white hover:bg-cyan-600 transition-colors"
                                >
                                    Зберегти
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
