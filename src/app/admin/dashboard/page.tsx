'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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

interface HeroContent {
    heroTitle: string;
    heroSubtitle: string;
    discountBanner: string;
    courseTypes: CourseType[];
}

export default function Dashboard() {
    const router = useRouter();

    // Перевірка авторизації через cookie
    useEffect(() => {
        const isAuthenticated = document.cookie.includes('isAuthenticated=true');
        if (!isAuthenticated) router.push('/admin');
    }, [router]);

    // Стан для heroContent
    const [heroData, setHeroData] = useState<HeroContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // 1. Завантажити поточні дані з API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/hero-content/get');
                const data = await res.json();
                if (data.success) {
                    setHeroData(data.data);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 2. Функція збереження
    const handleSave = async () => {
        if (!heroData) return;
        setMessage('');
        try {
            const res = await fetch('/api/hero-content/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(heroData)
            });
            const data = await res.json();
            if (data.success) {
                setMessage('Зміни успішно збережено!');
            } else {
                setMessage('Помилка збереження. Перевірте консоль.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Щось пішло не так...');
        }
    };

    // 3. Зміна полів Hero (заголовки, банер, тощо)
    const handleHeroChange = (field: keyof HeroContent, value: string) => {
        if (!heroData) return;
        setHeroData({
            ...heroData,
            [field]: value
        });
    };

    // 4. Зміна полів курсу
    const handleCourseChange = (index: number, field: keyof CourseType, value: any) => {
        if (!heroData) return;
        const updatedCourses = [...heroData.courseTypes];
        updatedCourses[index] = {
            ...updatedCourses[index],
            [field]: value
        };
        setHeroData({ ...heroData, courseTypes: updatedCourses });
    };

    // 5. Логаут
    const handleLogout = () => {
        document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/admin');
    };

    if (loading) {
        return <div className="text-center py-10 text-cyan-200">Завантаження даних...</div>;
    }

    return (
        <section className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            {/* Тло */}
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

                        {!heroData ? (
                            <p className="text-gray-400">Не вдалося завантажити дані...</p>
                        ) : (
                            <div className="space-y-8">
                                {/* Hero Title */}
                                <div>
                                    <label className="block text-cyan-100 mb-2">Заголовок (heroTitle):</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                                        value={heroData.heroTitle}
                                        onChange={(e) => handleHeroChange('heroTitle', e.target.value)}
                                    />
                                </div>

                                {/* Hero Subtitle */}
                                <div>
                                    <label className="block text-cyan-100 mb-2">Підзаголовок (heroSubtitle):</label>
                                    <textarea
                                        className="w-full p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white h-24"
                                        value={heroData.heroSubtitle}
                                        onChange={(e) => handleHeroChange('heroSubtitle', e.target.value)}
                                    />
                                </div>

                                {/* Discount Banner */}
                                <div>
                                    <label className="block text-cyan-100 mb-2">Текст акції (discountBanner):</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                                        value={heroData.discountBanner}
                                        onChange={(e) => handleHeroChange('discountBanner', e.target.value)}
                                    />
                                </div>

                                {/* Courses */}
                                <div>
                                    <h3 className="text-xl font-bold text-cyan-100 mb-4">Список курсів:</h3>
                                    {heroData.courseTypes.map((course, idx) => (
                                        <div key={idx} className="p-4 mb-4 border border-gray-600 rounded bg-gray-700/40">
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

                                            <div className="flex flex-wrap gap-4">
                                                <div>
                                                    <label className="block text-cyan-100">Стара ціна (originalPrice):</label>
                                                    <input
                                                        type="text"
                                                        className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                                                        value={course.originalPrice}
                                                        onChange={(e) => handleCourseChange(idx, 'originalPrice', e.target.value)}
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

                                            <div className="mt-2">
                                                <label className="block text-cyan-100">Посилання (link):</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                                                    value={course.link}
                                                    onChange={(e) => handleCourseChange(idx, 'link', e.target.value)}
                                                />
                                            </div>

                                            <div className="mt-2">
                                                <label className="flex items-center text-cyan-100">
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2"
                                                        checked={course.recommended || false}
                                                        onChange={(e) => handleCourseChange(idx, 'recommended', e.target.checked)}
                                                    />
                                                    Рекомендовано (recommended)
                                                </label>
                                            </div>

                                            {/* У прикладі не редагуємо масив features покроково,
                          але можна аналогічно вивести inputs для кожного пункту. */}
                                        </div>
                                    ))}
                                </div>

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
