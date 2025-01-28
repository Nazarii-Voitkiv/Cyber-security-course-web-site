'use client';

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
    const [heroMessage, setHeroMessage] = useState('');

    // Intro state
    const [intro, setIntro] = useState<IntroData | null>(null);
    const [introMessage, setIntroMessage] = useState('');

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
                <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
                    <h2 className="text-xl text-cyan-100 font-bold mb-4">Hero Section</h2>

                    {heroMessage && (
                        <div className="mb-4 p-2 bg-gray-700 text-green-400 rounded">
                            {heroMessage}
                        </div>
                    )}

                    {!hero ? (
                        <p className="text-gray-400">Не вдалося завантажити hero.json</p>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-cyan-100">Заголовок (heroTitle):</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    value={hero.heroTitle}
                                    onChange={(e) => setHero({ ...hero, heroTitle: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-cyan-100">Підзаголовок (heroSubtitle):</label>
                                <textarea
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-20"
                                    value={hero.heroSubtitle}
                                    onChange={(e) => setHero({ ...hero, heroSubtitle: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-cyan-100">Банер (discountBanner):</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    value={hero.discountBanner}
                                    onChange={(e) => setHero({ ...hero, discountBanner: e.target.value })}
                                />
                            </div>

                            {/* Курси */}
                            <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg">
                                <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                                    Список курсів
                                </summary>
                                <div className="mt-4 space-y-4">
                                    {hero.courseTypes.map((course, idx) => (
                                        <div key={idx} className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                                            <label className="block text-cyan-100">Назва (title):</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white mb-2"
                                                value={course.title}
                                                onChange={(e) => {
                                                    const updated = [...hero.courseTypes];
                                                    updated[idx] = { ...updated[idx], title: e.target.value };
                                                    setHero({ ...hero, courseTypes: updated });
                                                }}
                                            />

                                            <label className="block text-cyan-100">Опис (description):</label>
                                            <textarea
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white mb-2"
                                                value={course.description}
                                                onChange={(e) => {
                                                    const updated = [...hero.courseTypes];
                                                    updated[idx] = { ...updated[idx], description: e.target.value };
                                                    setHero({ ...hero, courseTypes: updated });
                                                }}
                                            />

                                            {/* Ціни і т.д. */}
                                            <div className="flex gap-4 mb-2">
                                                <div>
                                                    <label className="block text-cyan-100">Стара ціна:</label>
                                                    <input
                                                        type="text"
                                                        className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                        value={course.originalPrice}
                                                        onChange={(e) => {
                                                            const updated = [...hero.courseTypes];
                                                            updated[idx] = { ...updated[idx], originalPrice: e.target.value };
                                                            setHero({ ...hero, courseTypes: updated });
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-cyan-100">Нова ціна:</label>
                                                    <input
                                                        type="text"
                                                        className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                        value={course.price}
                                                        onChange={(e) => {
                                                            const updated = [...hero.courseTypes];
                                                            updated[idx] = { ...updated[idx], price: e.target.value };
                                                            setHero({ ...hero, courseTypes: updated });
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-cyan-100">Знижка:</label>
                                                    <input
                                                        type="text"
                                                        className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                        value={course.discount}
                                                        onChange={(e) => {
                                                            const updated = [...hero.courseTypes];
                                                            updated[idx] = { ...updated[idx], discount: e.target.value };
                                                            setHero({ ...hero, courseTypes: updated });
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-2">
                                                <label className="block text-cyan-100">Посилання (link):</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                    value={course.link}
                                                    onChange={(e) => {
                                                        const updated = [...hero.courseTypes];
                                                        updated[idx] = { ...updated[idx], link: e.target.value };
                                                        setHero({ ...hero, courseTypes: updated });
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label className="flex items-center text-cyan-100">
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2"
                                                        checked={course.recommended ?? false}
                                                        onChange={(e) => {
                                                            const updated = [...hero.courseTypes];
                                                            updated[idx] = { ...updated[idx], recommended: e.target.checked };
                                                            setHero({ ...hero, courseTypes: updated });
                                                        }}
                                                    />
                                                    recommended
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>

                            <button
                                onClick={saveHero}
                                className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded"
                            >
                                Зберегти Hero
                            </button>
                        </div>
                    )}
                </div>

                {/* ============== INTRO FORM ============== */}
                <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
                    <h2 className="text-xl text-cyan-100 font-bold mb-4">Intro Section</h2>

                    {introMessage && (
                        <div className="mb-4 p-2 bg-gray-700 text-green-400 rounded">
                            {introMessage}
                        </div>
                    )}

                    {!intro ? (
                        <p className="text-gray-400">Не вдалося завантажити intro.json</p>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-cyan-100">Головний заголовок (mainTitle):</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    value={intro.mainTitle}
                                    onChange={(e) => setIntro({ ...intro, mainTitle: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-cyan-100">Підзаголовок (mainSubtitle):</label>
                                <textarea
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-20"
                                    value={intro.mainSubtitle}
                                    onChange={(e) => setIntro({ ...intro, mainSubtitle: e.target.value })}
                                />
                            </div>

                            <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg">
                                <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                                    Абзаци (paragraphs)
                                </summary>
                                <div className="mt-4 space-y-4">
                                    {intro.paragraphs.map((p, idx) => (
                                        <div key={idx}>
                                            <label className="block text-cyan-100">Абзац {idx + 1}:</label>
                                            <textarea
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={p}
                                                onChange={(e) => {
                                                    const updated = [...intro.paragraphs];
                                                    updated[idx] = e.target.value;
                                                    setIntro({ ...intro, paragraphs: updated });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </details>

                            <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg">
                                <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                                    Пункти (points)
                                </summary>
                                <div className="mt-4 space-y-4">
                                    {intro.points.map((pt, idx) => (
                                        <div key={idx} className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                                            <label className="block text-cyan-100">Заголовок:</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white mb-2"
                                                value={pt.title}
                                                onChange={(e) => {
                                                    const updated = [...intro.points];
                                                    updated[idx] = { ...updated[idx], title: e.target.value };
                                                    setIntro({ ...intro, points: updated });
                                                }}
                                            />
                                            <label className="block text-cyan-100">Опис:</label>
                                            <textarea
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={pt.description}
                                                onChange={(e) => {
                                                    const updated = [...intro.points];
                                                    updated[idx] = { ...updated[idx], description: e.target.value };
                                                    setIntro({ ...intro, points: updated });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </details>

                            <div>
                                <label className="block text-cyan-100">Висновок (conclusion):</label>
                                <textarea
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-20"
                                    value={intro.conclusion}
                                    onChange={(e) => setIntro({ ...intro, conclusion: e.target.value })}
                                />
                            </div>

                            <button
                                onClick={saveIntro}
                                className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded"
                            >
                                Зберегти Intro
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
