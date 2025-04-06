'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminPageData } from '@/contexts/AdminPageDataContext';
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface ComparePlan {
    title: string;
    description: string;
    originalPrice: string;
    price: string;
    discount: string;
    features: string[];
    recommended?: boolean;
    link: string;
}

interface FeatureComparison {
    name: string;
    basic: boolean | string;
    full: boolean | string;
}

interface ComparePlansData {
    title: string;
    specialOfferBanner: string;
    leadMagnet: string;
    introBonus?: string;
    featuresTitle?: string;
    plans: ComparePlan[];
    featuresComparison: FeatureComparison[];
}

export default function ComparePlansEdit() {
    const { pageData, loading, refreshData } = useAdminPageData();
    const [data, setData] = useState<ComparePlansData | null>(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isSaving, setIsSaving] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [activePlanIndex, setActivePlanIndex] = useState<number | null>(null);

    useEffect(() => {
        if (pageData.comparePlans && !data) {
            setData(pageData.comparePlans as ComparePlansData);
        }
    }, [pageData, data]);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };
    
    const togglePlan = (idx: number) => {
        setActivePlanIndex(activePlanIndex === idx ? null : idx);
    };

    const handlePlanUpdate = (idx: number, field: keyof Omit<ComparePlan, 'features'>, value: string | boolean) => {
        if (!data) return;
        
        const updatedPlans = [...data.plans];
        updatedPlans[idx] = { ...updatedPlans[idx], [field]: value };
        
        setData({ ...data, plans: updatedPlans });
    };

    const handleFeatureUpdate = (planIdx: number, featureIdx: number, value: string) => {
        if (!data) return;
        
        const updatedPlans = [...data.plans];
        const updatedFeatures = [...updatedPlans[planIdx].features];
        updatedFeatures[featureIdx] = value;
        updatedPlans[planIdx] = { ...updatedPlans[planIdx], features: updatedFeatures };
        
        setData({ ...data, plans: updatedPlans });
    };

    const handleFeatureComparisonUpdate = (idx: number, field: keyof FeatureComparison, value: string | boolean) => {
        if (!data) return;
        
        const updatedComparisons = [...data.featuresComparison];
        updatedComparisons[idx] = { ...updatedComparisons[idx], [field]: value };
        
        setData({ ...data, featuresComparison: updatedComparisons });
    };

    const addPlan = () => {
        if (!data) return;
        
        const newPlan: ComparePlan = {
            title: 'Новий план',
            description: 'Опис плану',
            originalPrice: '999 ₴',
            price: '499 ₴',
            discount: '50%',
            features: ['Особливість 1'],
            link: 'https://example.com',
            recommended: false
        };
        
        setData({
            ...data,
            plans: [...data.plans, newPlan]
        });
        
        setActivePlanIndex(data.plans.length);
    };

    const removePlan = (idx: number) => {
        if (!data) return;
        
        const updatedPlans = data.plans.filter((_, i) => i !== idx);
        setData({ ...data, plans: updatedPlans });
        
        if (activePlanIndex === idx) {
            setActivePlanIndex(null);
        } else if (activePlanIndex !== null && activePlanIndex > idx) {
            setActivePlanIndex(activePlanIndex - 1);
        }
    };

    const addFeature = (planIdx: number) => {
        if (!data) return;
        
        const updatedPlans = [...data.plans];
        updatedPlans[planIdx] = {
            ...updatedPlans[planIdx],
            features: [...updatedPlans[planIdx].features, 'Нова особливість']
        };
        
        setData({ ...data, plans: updatedPlans });
    };

    const removeFeature = (planIdx: number, featureIdx: number) => {
        if (!data) return;
        
        const updatedPlans = [...data.plans];
        updatedPlans[planIdx] = {
            ...updatedPlans[planIdx],
            features: updatedPlans[planIdx].features.filter((_, i) => i !== featureIdx)
        };
        
        setData({ ...data, plans: updatedPlans });
    };

    const addFeatureComparison = () => {
        if (!data) return;
        
        const newComparison: FeatureComparison = {
            name: 'Нова функція',
            basic: false,
            full: true
        };
        
        setData({
            ...data,
            featuresComparison: [...data.featuresComparison, newComparison]
        });
    };

    const removeFeatureComparison = (idx: number) => {
        if (!data) return;
        
        const updatedComparisons = data.featuresComparison.filter((_, i) => i !== idx);
        setData({ ...data, featuresComparison: updatedComparisons });
    };

    const save = async () => {
        if (!data) return;
        setMessage('');
        setIsSaving(true);
        setStatus('idle');

        try {
            const response = await fetch('/api/direct-update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section: 'comparePlans', data })
            });

            const result = await response.json();
            
            setStatus(result.success ? 'success' : 'error');
            setMessage(result.success 
                ? 'Секцію &quot;Порівняння планів&quot; оновлено успішно!' 
                : `Помилка: ${result.error || 'Невідома помилка'}`
            );
            
            if (result.success) refreshData();
        } catch (error: unknown) {
            setStatus('error');
            const errorMessage = error instanceof Error ? error.message : 'Невідома помилка';
            setMessage(`Виникла помилка: ${errorMessage}`);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !data) {
        return (
            <div className="mb-8 bg-gray-800/70 p-6 rounded-xl shadow-lg border border-gray-700">
                <div className="animate-pulse space-y-4">
                    <div className="h-7 bg-gray-700/70 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-700/70 rounded w-full"></div>
                    <div className="h-4 bg-gray-700/70 rounded w-5/6"></div>
                    <div className="h-10 bg-gray-700/70 rounded-lg w-full"></div>
                </div>
            </div>
        );
    }

    const inputClasses = "w-full p-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200";
    const labelClasses = "block text-cyan-100 mb-1 font-medium";
    const panelClasses = "mb-5 bg-gray-700/30 p-5 rounded-xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-200";
    const sectionHeaderClasses = "flex items-center justify-between cursor-pointer p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/80 transition-all duration-200";
    
    return (
        <div className="mb-8 bg-gray-800/70 p-6 rounded-xl shadow-lg border border-gray-700/70 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-cyan-300 font-bold">Секція &quot;Порівняння планів&quot;</h2>
                <div className="text-xs text-gray-400">ID: comparePlans</div>
            </div>

            {message && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-lg ${
                        status === 'success' ? 'bg-green-900/40 text-green-400 border border-green-500/40' : 
                        status === 'error' ? 'bg-red-900/40 text-red-400 border border-red-500/40' : 
                        'bg-gray-700/40 text-gray-300'
                    }`}
                >
                    {message}
                </motion.div>
            )}

            <div className="space-y-6">
                <div className={panelClasses}>
                    <div className={`${labelClasses} text-lg mb-4`}>Основна інформація</div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className={labelClasses}>Заголовок секції:</label>
                            <input
                                type="text"
                                className={inputClasses}
                                value={data.title}
                                onChange={(e) => setData({ ...data, title: e.target.value })}
                                placeholder="Введіть заголовок секції"
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Банер зі спеціальною пропозицією:</label>
                            <input
                                type="text"
                                className={inputClasses}
                                value={data.specialOfferBanner}
                                onChange={(e) => setData({ ...data, specialOfferBanner: e.target.value })}
                                placeholder="Текст банера зі спеціальною пропозицією"
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Лід-магніт:</label>
                            <textarea
                                className={`${inputClasses} h-20`}
                                value={data.leadMagnet}
                                onChange={(e) => setData({ ...data, leadMagnet: e.target.value })}
                                placeholder="Текст лід-магніту"
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Вступний бонус (необов&apos;язково):</label>
                            <input
                                type="text"
                                className={inputClasses}
                                value={data.introBonus || ''}
                                onChange={(e) => setData({ ...data, introBonus: e.target.value })}
                                placeholder="Текст вступного бонусу (необов&apos;язково)"
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Заголовок для порівняння функцій (необов&apos;язково):</label>
                            <input
                                type="text"
                                className={inputClasses}
                                value={data.featuresTitle || ''}
                                onChange={(e) => setData({ ...data, featuresTitle: e.target.value })}
                                placeholder="Заголовок порівняння функцій (необов&apos;язково)"
                            />
                        </div>
                    </div>
                </div>

                <div className={panelClasses}>
                    <div 
                        className={sectionHeaderClasses}
                        onClick={() => toggleSection('plans')}
                    >
                        <div className="text-lg text-cyan-100 font-medium">Тарифні плани</div>
                        <div className="flex items-center">
                            <div className="mr-3 text-sm text-gray-400">
                                {data.plans.length} {data.plans.length === 1 ? 'план' : data.plans.length < 5 ? 'плани' : 'планів'}
                            </div>
                            {activeSection === 'plans' ? (
                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                            )}
                        </div>
                    </div>

                    {activeSection === 'plans' && (
                        <div className="mt-4 space-y-4">
                            <div className="flex justify-end">
                                <motion.button
                                    onClick={addPlan}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 bg-cyan-600/60 hover:bg-cyan-600/80 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Додати тарифний план</span>
                                </motion.button>
                            </div>

                            {data.plans.map((plan, idx) => (
                                <div key={idx} className="bg-gray-800/70 rounded-xl border border-gray-700/70 overflow-hidden">
                                    <div 
                                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/50"
                                        onClick={() => togglePlan(idx)}
                                    >
                                        <div className="flex items-center">
                                            <div className="bg-gray-700 text-gray-400 h-7 w-7 rounded-full flex items-center justify-center mr-3">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{plan.title}</div>
                                                <div className="text-sm text-gray-400">{plan.price} {plan.recommended && '• Рекомендований'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <motion.button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removePlan(idx);
                                                }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 rounded transition-colors"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </motion.button>
                                            {activePlanIndex === idx ? (
                                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                                            ) : (
                                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                                            )}
                                        </div>
                                    </div>

                                    {activePlanIndex === idx && (
                                        <div className="p-4 space-y-4 border-t border-gray-700/70">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClasses}>Назва плану:</label>
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={plan.title}
                                                        onChange={(e) => handlePlanUpdate(idx, 'title', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={labelClasses}>Посилання:</label>
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={plan.link}
                                                        onChange={(e) => handlePlanUpdate(idx, 'link', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className={labelClasses}>Опис плану:</label>
                                                <textarea
                                                    className={`${inputClasses} h-20`}
                                                    value={plan.description}
                                                    onChange={(e) => handlePlanUpdate(idx, 'description', e.target.value)}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className={labelClasses}>Стара ціна:</label>
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={plan.originalPrice}
                                                        onChange={(e) => handlePlanUpdate(idx, 'originalPrice', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={labelClasses}>Нова ціна:</label>
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={plan.price}
                                                        onChange={(e) => handlePlanUpdate(idx, 'price', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={labelClasses}>Знижка:</label>
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={plan.discount}
                                                        onChange={(e) => handlePlanUpdate(idx, 'discount', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 py-2">
                                                <input
                                                    type="checkbox"
                                                    id={`recommended-${idx}`}
                                                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-cyan-600 focus:ring-cyan-500"
                                                    checked={plan.recommended ?? false}
                                                    onChange={(e) => handlePlanUpdate(idx, 'recommended', e.target.checked)}
                                                />
                                                <label htmlFor={`recommended-${idx}`} className="text-cyan-100">
                                                    Рекомендований тариф
                                                </label>
                                            </div>

                                            <div className="bg-gray-700/30 rounded-lg p-4 mt-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-cyan-100 font-medium">Особливості плану</h4>
                                                    <motion.button
                                                        onClick={() => addFeature(idx)}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="text-sm flex items-center space-x-1 text-green-400 bg-green-900/30 hover:bg-green-900/50 py-1 px-3 rounded transition-colors"
                                                    >
                                                        <PlusIcon className="h-3 w-3" />
                                                        <span>Додати</span>
                                                    </motion.button>
                                                </div>
                                                
                                                <div className="space-y-3">
                                                    {plan.features.map((feature, featureIdx) => (
                                                        <div key={featureIdx} className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                className={inputClasses}
                                                                value={feature}
                                                                onChange={(e) => handleFeatureUpdate(idx, featureIdx, e.target.value)}
                                                                placeholder={`Особливість ${featureIdx + 1}`}
                                                            />
                                                            <motion.button
                                                                onClick={() => removeFeature(idx, featureIdx)}
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded transition-colors"
                                                            >
                                                                <TrashIcon className="h-5 w-5" />
                                                            </motion.button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={panelClasses}>
                    <div 
                        className={sectionHeaderClasses}
                        onClick={() => toggleSection('featuresComparison')}
                    >
                        <div className="text-lg text-cyan-100 font-medium">Порівняння функцій</div>
                        <div className="flex items-center">
                            <div className="mr-3 text-sm text-gray-400">
                                {data.featuresComparison.length} {data.featuresComparison.length === 1 ? 'функція' : data.featuresComparison.length < 5 ? 'функції' : 'функцій'}
                            </div>
                            {activeSection === 'featuresComparison' ? (
                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                            )}
                        </div>
                    </div>

                    {activeSection === 'featuresComparison' && (
                        <div className="mt-4 space-y-4">
                            <div className="flex justify-end">
                                <motion.button
                                    onClick={addFeatureComparison}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 bg-cyan-600/60 hover:bg-cyan-600/80 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Додати функцію для порівняння</span>
                                </motion.button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left py-2 px-3 text-cyan-100">Назва функції</th>
                                            <th className="text-left py-2 px-3 text-cyan-100">Базовий план</th>
                                            <th className="text-left py-2 px-3 text-cyan-100">Повний план</th>
                                            <th className="text-left py-2 px-3 text-cyan-100">Дії</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.featuresComparison.map((feature, idx) => (
                                            <tr key={idx} className="border-t border-gray-700">
                                                <td className="py-2 px-3">
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={feature.name}
                                                        onChange={(e) => handleFeatureComparisonUpdate(idx, 'name', e.target.value)}
                                                    />
                                                </td>
                                                <td className="py-2 px-3">
                                                    {typeof feature.basic === 'boolean' ? (
                                                        <div className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-cyan-600 focus:ring-cyan-500"
                                                                checked={feature.basic}
                                                                onChange={(e) => handleFeatureComparisonUpdate(idx, 'basic', e.target.checked)}
                                                            />
                                                            <span className="ml-2 text-gray-300">{feature.basic ? 'Так' : 'Ні'}</span>
                                                        </div>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            className={inputClasses}
                                                            value={feature.basic}
                                                            onChange={(e) => handleFeatureComparisonUpdate(idx, 'basic', e.target.value)}
                                                        />
                                                    )}
                                                </td>
                                                <td className="py-2 px-3">
                                                    {typeof feature.full === 'boolean' ? (
                                                        <div className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-cyan-600 focus:ring-cyan-500"
                                                                checked={feature.full}
                                                                onChange={(e) => handleFeatureComparisonUpdate(idx, 'full', e.target.checked)}
                                                            />
                                                            <span className="ml-2 text-gray-300">{feature.full ? 'Так' : 'Ні'}</span>
                                                        </div>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            className={inputClasses}
                                                            value={feature.full}
                                                            onChange={(e) => handleFeatureComparisonUpdate(idx, 'full', e.target.value)}
                                                        />
                                                    )}
                                                </td>
                                                <td className="py-2 px-3">
                                                    <motion.button
                                                        onClick={() => removeFeatureComparison(idx)}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="p-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 rounded transition-colors"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </motion.button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <motion.button
                    onClick={save}
                    disabled={isSaving}
                    whileHover={!isSaving ? { scale: 1.01 } : {}}
                    whileTap={!isSaving ? { scale: 0.99 } : {}}
                    className={`w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold text-lg shadow-lg shadow-blue-900/20 ${
                        isSaving ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {isSaving ? 'Збереження...' : 'Зберегти зміни'}
                </motion.button>
            </div>
        </div>
    );
}