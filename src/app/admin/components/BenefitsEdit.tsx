'use client';

import { useState, useEffect } from 'react';

interface Benefit {
    title: string;
    description: string;
}

interface BenefitsData {
    title: string;
    benefits: Benefit[];
}

export default function BenefitsEdit() {
    const [data, setData] = useState<BenefitsData | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/benefits/get')
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
            const res = await fetch('/api/benefits/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = await res.json();
            if (responseData.success) {
                setMessage('Benefits збережено успішно!');
            } else {
                setMessage('Помилка збереження Benefits.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Щось пішло не так при збереженні Benefits...');
        }
    };

    if (loading) return null;
    if (!data) return <div className="text-gray-400">Не вдалося завантажити дані</div>;

    return (
        <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
            <h2 className="text-xl text-cyan-100 font-bold mb-4">Benefits Section</h2>

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

                    <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg">
                        <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                            Benefits
                        </summary>
                        <div className="mt-4 space-y-4">
                            {data.benefits.map((benefit, idx) => (
                                <div key={idx} className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Заголовок:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={benefit.title}
                                            onChange={(e) => {
                                                const updated = [...data.benefits];
                                                updated[idx] = { ...updated[idx], title: e.target.value };
                                                setData({ ...data, benefits: updated });
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Опис:</label>
                                        <textarea
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={benefit.description}
                                            onChange={(e) => {
                                                const updated = [...data.benefits];
                                                updated[idx] = { ...updated[idx], description: e.target.value };
                                                setData({ ...data, benefits: updated });
                                            }}
                                        />
                                    </div>
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