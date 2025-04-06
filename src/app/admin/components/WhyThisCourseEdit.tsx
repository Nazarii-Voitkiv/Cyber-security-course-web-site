'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminPageData } from '@/contexts/AdminPageDataContext';
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface WhyReason {
    title: string;
    description: string;
}

interface WhyThisCourseData {
    title: string;
    reasons: WhyReason[];
}

export default function WhyThisCourseEdit() {
    const { pageData, loading, refreshData } = useAdminPageData();
    const [data, setData] = useState<WhyThisCourseData | null>(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isSaving, setIsSaving] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        if (pageData.whyThisCourse && !data) {
            setData(pageData.whyThisCourse as WhyThisCourseData);
        }
    }, [pageData, data]);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const handleReasonUpdate = (idx: number, field: keyof WhyReason, value: string) => {
        if (!data) return;
        
        const updatedReasons = [...data.reasons];
        updatedReasons[idx] = { ...updatedReasons[idx], [field]: value };
        
        setData({ ...data, reasons: updatedReasons });
    };

    const addReason = () => {
        if (!data) return;
        
        const newReason: WhyReason = {
            title: 'Нова причина',
            description: 'Опис причини'
        };
        
        setData({
            ...data,
            reasons: [...data.reasons, newReason]
        });
    };

    const removeReason = (idx: number) => {
        if (!data) return;
        
        const updatedReasons = data.reasons.filter((_, i) => i !== idx);
        setData({ ...data, reasons: updatedReasons });
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
                body: JSON.stringify({ section: 'whyThisCourse', data })
            });

            const result = await response.json();
            
            setStatus(result.success ? 'success' : 'error');
            setMessage(result.success 
                ? 'Секцію &quot;Чому цей курс&quot; оновлено успішно!' 
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
                <h2 className="text-2xl text-cyan-300 font-bold">Секція &quot;Чому цей курс&quot;</h2>
                <div className="text-xs text-gray-400">ID: whyThisCourse</div>
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
                    <div className={`${labelClasses} text-lg mb-4`}>Заголовок секції</div>
                    <input
                        type="text"
                        className={inputClasses}
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                        placeholder="Введіть заголовок секції"
                    />
                </div>

                <div className={panelClasses}>
                    <div 
                        className={sectionHeaderClasses}
                        onClick={() => toggleSection('reasons')}
                    >
                        <div className="text-lg text-cyan-100 font-medium">Причини</div>
                        <div className="flex items-center">
                            <div className="mr-3 text-sm text-gray-400">
                                {data.reasons.length} {data.reasons.length === 1 ? 'причина' : data.reasons.length < 5 ? 'причини' : 'причин'}
                            </div>
                            {activeSection === 'reasons' ? (
                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                            )}
                        </div>
                    </div>

                    {activeSection === 'reasons' && (
                        <div className="mt-4 space-y-4">
                            <div className="flex justify-end">
                                <motion.button
                                    onClick={addReason}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 bg-cyan-600/60 hover:bg-cyan-600/80 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Додати причину</span>
                                </motion.button>
                            </div>

                            {data.reasons.map((reason, idx) => (
                                <div key={idx} className="bg-gray-800/70 rounded-xl border border-gray-700/70 overflow-hidden">
                                    <div className="flex justify-between items-center p-4 border-b border-gray-700/50">
                                        <div className="flex items-center">
                                            <div className="bg-gray-700 text-gray-400 h-7 w-7 rounded-full flex items-center justify-center mr-3">
                                                {idx + 1}
                                            </div>
                                            <div className="text-cyan-100 font-medium">{reason.title.substring(0, 30)}{reason.title.length > 30 ? '...' : ''}</div>
                                        </div>
                                        <motion.button
                                            onClick={() => removeReason(idx)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 rounded transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </motion.button>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div>
                                            <label className={labelClasses}>Заголовок:</label>
                                            <input
                                                type="text"
                                                className={inputClasses}
                                                value={reason.title}
                                                onChange={(e) => handleReasonUpdate(idx, 'title', e.target.value)}
                                                placeholder="Заголовок причини"
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Опис:</label>
                                            <textarea
                                                className={`${inputClasses} h-24`}
                                                value={reason.description}
                                                onChange={(e) => handleReasonUpdate(idx, 'description', e.target.value)}
                                                placeholder="Опис причини"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
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