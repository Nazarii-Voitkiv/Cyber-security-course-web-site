'use client';

import { useState, useEffect } from 'react';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQData {
    faqs: FAQ[];
}

const defaultData: FAQData = {
    faqs: []
};

export default function FaqEdit() {
    const [data, setData] = useState<FAQData>(defaultData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch('/api/faq/get')
            .then((r) => r.json())
            .then((json) => {
                if (json.success && json.data && Array.isArray(json.data.faqs)) {
                    setData(json.data);
                } else {
                    setError('Отримані дані мають неправильну структуру');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error loading FAQ:', err);
                setError('Помилка при завантаженні даних');
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setMessage('');
        try {
            const res = await fetch('/api/faq/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (json.success) {
                setMessage('FAQ збережено успішно!');
            } else {
                setMessage('Помилка збереження FAQ');
            }
        } catch (error) {
            console.error(error);
            setMessage('Помилка при збереженні...');
        }
    };

    if (loading) return <div className="text-center py-4 text-cyan-200">Завантаження...</div>;
    if (error) return <div className="text-center py-4 text-red-400">{error}</div>;

    return (
        <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
            <h2 className="text-xl text-cyan-100 font-bold mb-4">FAQ Section</h2>

            {message && (
                <div className="mb-4 p-2 bg-gray-700 text-green-400 rounded">
                    {message}
                </div>
            )}

            <details open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
                <summary className="cursor-pointer text-lg text-cyan-100 mb-4 hover:text-cyan-200">
                    Редагування FAQ {isOpen ? '▼' : '▶'}
                </summary>

                <div className="space-y-6">
                    {data.faqs.map((faq, index) => (
                        <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-cyan-100">Питання:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={faq.question}
                                        onChange={(e) => {
                                            const updated = [...data.faqs];
                                            updated[index] = { ...faq, question: e.target.value };
                                            setData({ ...data, faqs: updated });
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-cyan-100">Відповідь:</label>
                                    <textarea
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-32"
                                        value={faq.answer}
                                        onChange={(e) => {
                                            const updated = [...data.faqs];
                                            updated[index] = { ...faq, answer: e.target.value };
                                            setData({ ...data, faqs: updated });
                                        }}
                                    />
                                </div>
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
    );
}
