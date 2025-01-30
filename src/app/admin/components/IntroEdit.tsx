'use client';

import { useState, useEffect } from 'react';

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

export default function IntroEdit() {
    const [data, setData] = useState<IntroData | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/intro/get')
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
            const res = await fetch('/api/intro/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = await res.json();
            if (responseData.success) {
                setMessage('Intro збережено успішно!');
            } else {
                setMessage('Помилка збереження Intro.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Щось пішло не так при збереженні Intro...');
        }
    };

    if (loading) {
        return null;
    }

    return (
        <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
            <h2 className="text-xl text-cyan-100 font-bold mb-4">Intro Section</h2>

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
                        <label className="block text-cyan-100">Головний заголовок (mainTitle):</label>
                        <input
                            type="text"
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            value={data.mainTitle}
                            onChange={(e) => setData({ ...data, mainTitle: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-cyan-100">Підзаголовок (mainSubtitle):</label>
                        <textarea
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-20"
                            value={data.mainSubtitle}
                            onChange={(e) => setData({ ...data, mainSubtitle: e.target.value })}
                        />
                    </div>

                    <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg">
                        <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                            Абзаци (paragraphs)
                        </summary>
                        <div className="mt-4 space-y-4">
                            {data.paragraphs.map((p, idx) => (
                                <div key={idx}>
                                    <label className="block text-cyan-100">Абзац {idx + 1}:</label>
                                    <textarea
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={p}
                                        onChange={(e) => {
                                            const updated = [...data.paragraphs];
                                            updated[idx] = e.target.value;
                                            setData({ ...data, paragraphs: updated });
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
                            {data.points.map((point, idx) => (
                                <div key={idx} className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Заголовок:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={point.title}
                                            onChange={(e) => {
                                                const updated = [...data.points];
                                                updated[idx] = { ...updated[idx], title: e.target.value };
                                                setData({ ...data, points: updated });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-cyan-100">Опис:</label>
                                        <textarea
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={point.description}
                                            onChange={(e) => {
                                                const updated = [...data.points];
                                                updated[idx] = { ...updated[idx], description: e.target.value };
                                                setData({ ...data, points: updated });
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </details>

                    <div>
                        <label className="block text-cyan-100">Висновок (conclusion):</label>
                        <textarea
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-20"
                            value={data.conclusion}
                            onChange={(e) => setData({ ...data, conclusion: e.target.value })}
                        />
                    </div>

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
