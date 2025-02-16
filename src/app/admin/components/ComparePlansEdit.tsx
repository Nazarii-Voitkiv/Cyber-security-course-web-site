'use client';

import { useState, useEffect } from 'react';

interface Plan {
    title: string;
    description: string;
    originalPrice: string;
    price: string;
    discount: string;
    recommended?: boolean;
    features: string[];
    link: string;
}

interface FeatureComparison {
    name: string;
    basic: string | boolean;
    full: string | boolean;
}

interface ComparePlansData {
    title: string;
    specialOfferBanner: string;
    featuresTitle: string;
    plans: Plan[];
    featuresComparison: FeatureComparison[];
}

export default function ComparePlansEdit() {
    const [data, setData] = useState<ComparePlansData>({
        title: '',
        specialOfferBanner: '',
        featuresTitle: '',
        plans: [],
        featuresComparison: [] // Додаємо початкове значення
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/compareplans/get')
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
            const res = await fetch('/api/compareplans/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (json.success) {
                setMessage('ComparePlans збережено успішно!');
            } else {
                setMessage('Помилка збереження ComparePlans');
            }
        } catch (error) {
            console.error(error);
            setMessage('Помилка при збереженні...');
        }
    };

    if (loading) return null;
    if (!data) return <div className="text-gray-400">Не вдалося завантажити дані</div>;

    return (
        <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
            <h2 className="text-xl text-cyan-100 font-bold mb-4">Compare Plans Section</h2>

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
                    <label className="block text-cyan-100">Банер спеціальної пропозиції:</label>
                    <input
                        type="text"
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        value={data.specialOfferBanner}
                        onChange={(e) => setData({ ...data, specialOfferBanner: e.target.value })}
                    />
                </div>

                <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg">
                    <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                        Плани
                    </summary>
                    <div className="mt-4 space-y-4">
                        {data.plans.map((plan, idx) => (
                            <div key={idx} className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                                <div className="mb-2">
                                    <label className="block text-cyan-100">Назва:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={plan.title}
                                        onChange={(e) => {
                                            const updated = [...data.plans];
                                            updated[idx] = { ...updated[idx], title: e.target.value };
                                            setData({ ...data, plans: updated });
                                        }}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-cyan-100">Опис:</label>
                                    <textarea
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={plan.description}
                                        onChange={(e) => {
                                            const updated = [...data.plans];
                                            updated[idx] = { ...updated[idx], description: e.target.value };
                                            setData({ ...data, plans: updated });
                                        }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Оригінальна ціна:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={plan.originalPrice}
                                            onChange={(e) => {
                                                const updated = [...data.plans];
                                                updated[idx] = { ...updated[idx], originalPrice: e.target.value };
                                                setData({ ...data, plans: updated });
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Ціна зі знижкою:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={plan.price}
                                            onChange={(e) => {
                                                const updated = [...data.plans];
                                                updated[idx] = { ...updated[idx], price: e.target.value };
                                                setData({ ...data, plans: updated });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label className="block text-cyan-100">Знижка:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={plan.discount}
                                        onChange={(e) => {
                                            const updated = [...data.plans];
                                            updated[idx] = { ...updated[idx], discount: e.target.value };
                                            setData({ ...data, plans: updated });
                                        }}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="flex items-center text-cyan-100">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={plan.recommended || false}
                                            onChange={(e) => {
                                                const updated = [...data.plans];
                                                updated[idx] = { ...updated[idx], recommended: e.target.checked };
                                                setData({ ...data, plans: updated });
                                            }}
                                        />
                                        Рекомендований план
                                    </label>
                                </div>

                                <div className="mb-2">
                                    <label className="block text-cyan-100">Посилання:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={plan.link}
                                        onChange={(e) => {
                                            const updated = [...data.plans];
                                            updated[idx] = { ...updated[idx], link: e.target.value };
                                            setData({ ...data, plans: updated });
                                        }}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-cyan-100">Особливості:</label>
                                    {plan.features.map((feature, featureIdx) => (
                                        <input
                                            key={featureIdx}
                                            type="text"
                                            className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={feature}
                                            onChange={(e) => {
                                                const updated = [...data.plans];
                                                const updatedFeatures = [...updated[idx].features];
                                                updatedFeatures[featureIdx] = e.target.value;
                                                updated[idx] = { ...updated[idx], features: updatedFeatures };
                                                setData({ ...data, plans: updated });
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </details>

                <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg">
                    <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
                        Порівняння особливостей
                    </summary>
                    <div className="mt-4 space-y-4">
                        {(data.featuresComparison || []).map((feature, idx) => (
                            <div key={idx} className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                                <div className="mb-2">
                                    <label className="block text-cyan-100">Назва особливості:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        value={feature.name}
                                        onChange={(e) => {
                                            const updated = [...data.featuresComparison];
                                            updated[idx] = { ...updated[idx], name: e.target.value };
                                            setData({ ...data, featuresComparison: updated });
                                        }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Базовий план:</label>
                                        {typeof feature.basic === 'boolean' ? (
                                            <input
                                                type="checkbox"
                                                checked={feature.basic}
                                                onChange={(e) => {
                                                    const updated = [...data.featuresComparison];
                                                    updated[idx] = { ...updated[idx], basic: e.target.checked };
                                                    setData({ ...data, featuresComparison: updated });
                                                }}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={feature.basic}
                                                onChange={(e) => {
                                                    const updated = [...data.featuresComparison];
                                                    updated[idx] = { ...updated[idx], basic: e.target.value };
                                                    setData({ ...data, featuresComparison: updated });
                                                }}
                                            />
                                        )}
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-cyan-100">Повний план:</label>
                                        {typeof feature.full === 'boolean' ? (
                                            <input
                                                type="checkbox"
                                                checked={feature.full}
                                                onChange={(e) => {
                                                    const updated = [...data.featuresComparison];
                                                    updated[idx] = { ...updated[idx], full: e.target.checked };
                                                    setData({ ...data, featuresComparison: updated });
                                                }}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                value={feature.full}
                                                onChange={(e) => {
                                                    const updated = [...data.featuresComparison];
                                                    updated[idx] = { ...updated[idx], full: e.target.value };
                                                    setData({ ...data, featuresComparison: updated });
                                                }}
                                            />
                                        )}
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
        </div>
    );
}