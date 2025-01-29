'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WhyReason {
    title: string;
    description: string;
    icon: string;
    color: string;
    bgColor: string;
}

interface WhyThisCourseData {
    title: string;
    reasons: WhyReason[];
}

export default function WhyThisCourseEdit() {
    const [data, setData] = useState<WhyThisCourseData | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/whycourse/get')
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
            const res = await fetch('/api/whycourse/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = await res.json();
            if (responseData.success) {
                setMessage('WhyThisCourse збережено успішно!');
            } else {
                setMessage('Помилка збереження WhyThisCourse.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Щось пішло не так при збереженні WhyThisCourse...');
        }
    };

    if (loading) {
        return <div className="text-center py-4 text-cyan-200">Завантаження...</div>;
    }

    return (
        <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
            <h2 className="text-xl text-cyan-100 font-bold mb-4">Why This Course Section</h2>

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
                        <label className="block text-cyan-100">Заголовок:</label>
                        <input
                            type="text"
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                        />
                    </div>

                    <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg" open>
                        <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                            Причини
                        </summary>
                        <div className="mt-4 space-y-4">
                            {data.reasons.map((reason, idx) => (
                                <div key={idx} className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Заголовок:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={reason.title}
                                            onChange={(e) => {
                                                const updated = [...data.reasons];
                                                updated[idx] = { ...updated[idx], title: e.target.value };
                                                setData({ ...data, reasons: updated });
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Опис:</label>
                                        <textarea
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={reason.description}
                                            onChange={(e) => {
                                                const updated = [...data.reasons];
                                                updated[idx] = { ...updated[idx], description: e.target.value };
                                                setData({ ...data, reasons: updated });
                                            }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <label className="block text-cyan-100">Іконка:</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={reason.icon}
                                                onChange={(e) => {
                                                    const updated = [...data.reasons];
                                                    updated[idx] = { ...updated[idx], icon: e.target.value };
                                                    setData({ ...data, reasons: updated });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-cyan-100">Колір тексту:</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={reason.color}
                                                onChange={(e) => {
                                                    const updated = [...data.reasons];
                                                    updated[idx] = { ...updated[idx], color: e.target.value };
                                                    setData({ ...data, reasons: updated });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-cyan-100">Колір фону:</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={reason.bgColor}
                                                onChange={(e) => {
                                                    const updated = [...data.reasons];
                                                    updated[idx] = { ...updated[idx], bgColor: e.target.value };
                                                    setData({ ...data, reasons: updated });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </details>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={save}
                        className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded"
                    >
                        Зберегти Why This Course
                    </motion.button>
                </div>
            )}
        </div>
    );
}
