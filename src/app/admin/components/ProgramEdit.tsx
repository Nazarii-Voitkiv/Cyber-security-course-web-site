'use client';

import { useState, useEffect } from 'react';

interface Module {
    id: number;
    title: string;
    description: string;
    topics: string[];
}

interface ProgramData {
    title: string;
    subtitle: string;
    modules: Module[];
}

export default function ProgramEdit() {
    const [data, setData] = useState<ProgramData | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/program/get')
            .then((r) => r.json())
            .then((json) => {
                if (json.success) {
                    setData(json.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        if (!data) return;
        setMessage('');
        try {
            const res = await fetch('/api/program/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (json.success) {
                setMessage('Program збережено успішно!');
            } else {
                setMessage('Помилка збереження Program');
            }
        } catch (error) {
            console.error(error);
            setMessage('Помилка при збереженні...');
        }
    };

    if (loading) return null;
    if (!data) return <div className="text-gray-400">Не вдалося завантажити program.json</div>;

    return (
        <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
            <h2 className="text-xl text-cyan-100 font-bold mb-4">Program Section</h2>

            {message && (
                <div className="mb-4 p-2 bg-gray-700 text-green-400 rounded">
                    {message}
                </div>
            )}

            <div className="space-y-4">
                <div className="mb-2">
                    <label className="block text-cyan-100">Заголовок:</label>
                    <input
                        type="text"
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-cyan-100">Підзаголовок:</label>
                    <textarea
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        value={data.subtitle}
                        onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                    />
                </div>

                <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg">
                    <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                        Модулі
                    </summary>
                    <div className="mt-4 space-y-4">
                        {data.modules.map((module, idx) => (
                            <div key={idx} className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                                <div className="mb-2">
                                    <label className="block text-cyan-100">ID:</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={module.id}
                                        onChange={(e) => {
                                            const updated = [...data.modules];
                                            updated[idx] = { ...updated[idx], id: parseInt(e.target.value) };
                                            setData({ ...data, modules: updated });
                                        }}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-cyan-100">Заголовок:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={module.title}
                                        onChange={(e) => {
                                            const updated = [...data.modules];
                                            updated[idx] = { ...updated[idx], title: e.target.value };
                                            setData({ ...data, modules: updated });
                                        }}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-cyan-100">Опис:</label>
                                    <textarea
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={module.description}
                                        onChange={(e) => {
                                            const updated = [...data.modules];
                                            updated[idx] = { ...updated[idx], description: e.target.value };
                                            setData({ ...data, modules: updated });
                                        }}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-cyan-100">Теми:</label>
                                    {module.topics.map((topic, topicIdx) => (
                                        <input
                                            key={topicIdx}
                                            type="text"
                                            className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={topic}
                                            onChange={(e) => {
                                                const updated = [...data.modules];
                                                const updatedTopics = [...updated[idx].topics];
                                                updatedTopics[topicIdx] = e.target.value;
                                                updated[idx] = { ...updated[idx], topics: updatedTopics };
                                                setData({ ...data, modules: updated });
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </details>

                <div className="mt-6">
                    <button
                        onClick={handleSave}
                        className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                    >
                        Зберегти зміни
                    </button>
                </div>
            </div>
        </div>
    );
}
