'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
    id: number;
    content: string;
    rating: number;
    name: string;
    position: string;
    image: string;
}

interface TestimonialsData {
    testimonials: Testimonial[];
}

const defaultData: TestimonialsData = {
    testimonials: []
};

export default function TestimonialsEdit() {
    const [data, setData] = useState<TestimonialsData>(defaultData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch('/api/testimonials/get')
            .then((r) => r.json())
            .then((json) => {
                if (json.success && json.data && Array.isArray(json.data.testimonials)) {
                    setData(json.data);
                } else {
                    setError('Отримані дані мають неправильну структуру');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error loading testimonials:', err);
                setError('Помилка при завантаженні даних');
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setMessage('');
        try {
            const res = await fetch('/api/testimonials/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (json.success) {
                setMessage('Відгуки збережено успішно!');
            } else {
                setMessage('Помилка збереження відгуків');
            }
        } catch (error) {
            console.error(error);
            setMessage('Помилка при збереженні...');
        }
    };

    if (loading) return null;
    if (error) return <div className="text-center py-4 text-red-400">{error}</div>;

    return (
        <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
            <h2 className="text-xl text-cyan-100 font-bold mb-4">Testimonials Section</h2>

            {message && (
                <div className="mb-4 p-2 bg-gray-700 text-green-400 rounded">
                    {message}
                </div>
            )}

            <details open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
                <summary className="cursor-pointer text-lg text-cyan-100 mb-4 hover:text-cyan-200">
                    Редагування відгуків {isOpen ? '▼' : '▶'}
                </summary>

                <div className="space-y-6">
                    {data.testimonials.map((testimonial, index) => (
                        <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                            <div className="grid gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`testimonial-${index}-name`}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id={`testimonial-${index}-name`}
                                        value={testimonial.name}
                                        onChange={(e) => {
                                            const updated = [...data.testimonials];
                                            updated[index] = { ...testimonial, name: e.target.value };
                                            setData({ ...data, testimonials: updated });
                                        }}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter client&apos;s name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-cyan-100">Посада:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={testimonial.position}
                                        onChange={(e) => {
                                            const updated = [...data.testimonials];
                                            updated[index] = { ...testimonial, position: e.target.value };
                                            setData({ ...data, testimonials: updated });
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-cyan-100">Відгук:</label>
                                    <textarea
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-32"
                                        value={testimonial.content}
                                        onChange={(e) => {
                                            const updated = [...data.testimonials];
                                            updated[index] = { ...testimonial, content: e.target.value };
                                            setData({ ...data, testimonials: updated });
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-cyan-100">Рейтинг (1-5):</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={testimonial.rating}
                                        onChange={(e) => {
                                            const rating = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
                                            const updated = [...data.testimonials];
                                            updated[index] = { ...testimonial, rating };
                                            setData({ ...data, testimonials: updated });
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-cyan-100">URL зображення:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={testimonial.image}
                                        onChange={(e) => {
                                            const updated = [...data.testimonials];
                                            updated[index] = { ...testimonial, image: e.target.value };
                                            setData({ ...data, testimonials: updated });
                                        }}
                                    />
                                    <p className="text-sm text-gray-500">Зображення не повинно бути більше ніж 1МБ. Використовуйте формат .jpg або .png</p>
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
