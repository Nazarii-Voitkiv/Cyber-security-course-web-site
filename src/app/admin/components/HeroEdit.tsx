'use client';

import { useState, useEffect } from 'react';
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

export default function HeroEdit() {
    const [data, setData] = useState<HeroData | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/hero/get')
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    setData(data.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const save = async () => {
        if (!data) return;
        setMessage('');

        try {
            const res = await fetch('/api/hero/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = await res.json();
            if (responseData.success) {
                setMessage('Hero збережено успішно!');
            } else {
                setMessage('Помилка збереження Hero.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Щось пішло не так при збереженні Hero...');
        }
    };

    if (loading) {
        return <div className="text-center py-4 text-cyan-200">Завантаження...</div>;
    }

    return (
        <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
            <h2 className="text-xl text-cyan-100 font-bold mb-4">Hero Section</h2>

            {message && (
                <div className="mb-4 p-2 bg-gray-700 text-green-400 rounded">
                    {message}
                </div>
            )}

            {!data ? (
                <p className="text-gray-400">Не вдалося завантажити дані</p>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="block text-cyan-100">Заголовок (heroTitle):</label>
                        <input
                            type="text"
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            value={data.heroTitle}
                            onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-cyan-100">Підзаголовок (heroSubtitle):</label>
                        <textarea
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-20"
                            value={data.heroSubtitle}
                            onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-cyan-100">Банер (discountBanner):</label>
                        <input
                            type="text"
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            value={data.discountBanner}
                            onChange={(e) => setData({ ...data, discountBanner: e.target.value })}
                        />
                    </div>

                    <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg">
                        <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                            Список курсів
                        </summary>
                        <div className="mt-4 space-y-4">
                            {data.courseTypes.map((course, idx) => (
                                <div key={idx} className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Назва (title):</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={course.title}
                                            onChange={(e) => {
                                                const updated = [...data.courseTypes];
                                                updated[idx] = { ...updated[idx], title: e.target.value };
                                                setData({ ...data, courseTypes: updated });
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Опис (description):</label>
                                        <textarea
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={course.description}
                                            onChange={(e) => {
                                                const updated = [...data.courseTypes];
                                                updated[idx] = { ...updated[idx], description: e.target.value };
                                                setData({ ...data, courseTypes: updated });
                                            }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 mb-2">
                                        <div>
                                            <label className="block text-cyan-100">Стара ціна:</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={course.originalPrice}
                                                onChange={(e) => {
                                                    const updated = [...data.courseTypes];
                                                    updated[idx] = { ...updated[idx], originalPrice: e.target.value };
                                                    setData({ ...data, courseTypes: updated });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-cyan-100">Нова ціна:</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={course.price}
                                                onChange={(e) => {
                                                    const updated = [...data.courseTypes];
                                                    updated[idx] = { ...updated[idx], price: e.target.value };
                                                    setData({ ...data, courseTypes: updated });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-cyan-100">Знижка:</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={course.discount}
                                                onChange={(e) => {
                                                    const updated = [...data.courseTypes];
                                                    updated[idx] = { ...updated[idx], discount: e.target.value };
                                                    setData({ ...data, courseTypes: updated });
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Посилання:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={course.link}
                                            onChange={(e) => {
                                                const updated = [...data.courseTypes];
                                                updated[idx] = { ...updated[idx], link: e.target.value };
                                                setData({ ...data, courseTypes: updated });
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="flex items-center space-x-2 text-cyan-100">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={course.recommended ?? false}
                                                onChange={(e) => {
                                                    const updated = [...data.courseTypes];
                                                    updated[idx] = { ...updated[idx], recommended: e.target.checked };
                                                    setData({ ...data, courseTypes: updated });
                                                }}
                                            />
                                            <span>Recommended</span>
                                        </label>
                                    </div>

                                    <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg mt-2">
                                        <summary className="cursor-pointer text-cyan-100 font-semibold">
                                            Особливості курсу
                                        </summary>
                                        <div className="mt-4 space-y-2">
                                            {course.features.map((feature, featureIdx) => (
                                                <div key={featureIdx} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                        value={feature}
                                                        onChange={(e) => {
                                                            const updatedCourse = { ...course };
                                                            updatedCourse.features[featureIdx] = e.target.value;
                                                            const updatedCourses = [...data.courseTypes];
                                                            updatedCourses[idx] = updatedCourse;
                                                            setData({ ...data, courseTypes: updatedCourses });
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const updatedCourse = { ...course };
                                                            updatedCourse.features = course.features.filter((_, i) => i !== featureIdx);
                                                            const updatedCourses = [...data.courseTypes];
                                                            updatedCourses[idx] = updatedCourse;
                                                            setData({ ...data, courseTypes: updatedCourses });
                                                        }}
                                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        Видалити
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => {
                                                    const updatedCourse = { ...course };
                                                    updatedCourse.features = [...course.features, ''];
                                                    const updatedCourses = [...data.courseTypes];
                                                    updatedCourses[idx] = updatedCourse;
                                                    setData({ ...data, courseTypes: updatedCourses });
                                                }}
                                                className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Додати особливість
                                            </button>
                                        </div>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </details>

                    <div className="mt-6">
                        <button
                            onClick={save}
                            className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                        >
                            Зберегти зміни
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
