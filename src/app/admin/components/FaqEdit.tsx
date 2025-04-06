'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminPageData } from '@/contexts/AdminPageDataContext';
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqData {
    faqs: FaqItem[];
}

export default function FaqEdit() {
    const { pageData, loading, refreshData } = useAdminPageData();
    const [data, setData] = useState<FaqData | null>(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isSaving, setIsSaving] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

    useEffect(() => {
        if (pageData.faq && !data) {
            setData(pageData.faq as FaqData);
        }
    }, [pageData, data]);

    const toggleItem = (idx: number) => {
        setActiveItemIndex(activeItemIndex === idx ? null : idx);
    };

    const handleFaqUpdate = (idx: number, field: keyof FaqItem, value: string) => {
        if (!data) return;
        
        const updatedFaqs = [...data.faqs];
        updatedFaqs[idx] = { ...updatedFaqs[idx], [field]: value };
        
        setData({ ...data, faqs: updatedFaqs });
    };

    const addFaq = () => {
        if (!data) return;
        
        const newFaq: FaqItem = {
            question: 'Нове питання',
            answer: 'Нова відповідь'
        };
        
        setData({
            ...data,
            faqs: [...data.faqs, newFaq]
        });
        
        setActiveItemIndex(data.faqs.length);
    };

    const removeFaq = (idx: number) => {
        if (!data) return;
        
        const updatedFaqs = data.faqs.filter((_, i) => i !== idx);
        setData({ ...data, faqs: updatedFaqs });
        
        if (activeItemIndex === idx) {
            setActiveItemIndex(null);
        } else if (activeItemIndex !== null && activeItemIndex > idx) {
            setActiveItemIndex(activeItemIndex - 1);
        }
    };

    const moveFaq = (idx: number, direction: 'up' | 'down') => {
        if (!data || !data.faqs.length) return;
        
        const newIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (newIdx < 0 || newIdx >= data.faqs.length) return;
        
        const updatedFaqs = [...data.faqs];
        const temp = updatedFaqs[idx];
        updatedFaqs[idx] = updatedFaqs[newIdx];
        updatedFaqs[newIdx] = temp;
        
        setData({ ...data, faqs: updatedFaqs });
        
        if (activeItemIndex === idx) {
            setActiveItemIndex(newIdx);
        } else if (activeItemIndex === newIdx) {
            setActiveItemIndex(idx);
        }
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
                body: JSON.stringify({ section: 'faq', data })
            });

            const result = await response.json();
            
            setStatus(result.success ? 'success' : 'error');
            setMessage(result.success 
                ? 'Секцію &quot;FAQ&quot; оновлено успішно!' 
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
    
    return (
        <div className="mb-8 bg-gray-800/70 p-6 rounded-xl shadow-lg border border-gray-700/70 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-cyan-300 font-bold">Секція &quot;FAQ&quot;</h2>
                <div className="text-xs text-gray-400">ID: faq</div>
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
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-lg text-cyan-100 font-medium">Питання та відповіді</div>
                        <motion.button
                            onClick={addFaq}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center space-x-2 bg-cyan-600/60 hover:bg-cyan-600/80 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                            <PlusIcon className="h-4 w-4" />
                            <span>Додати FAQ</span>
                        </motion.button>
                    </div>

                    <div className="space-y-4">
                        {data.faqs.map((faq, idx) => (
                            <div key={idx} className="bg-gray-800/70 rounded-xl border border-gray-700/70 overflow-hidden">
                                <div 
                                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/50"
                                    onClick={() => toggleItem(idx)}
                                >
                                    <div className="flex items-center">
                                        <div className="bg-gray-700 text-gray-400 h-7 w-7 rounded-full flex items-center justify-center mr-3">
                                            {idx + 1}
                                        </div>
                                        <div className="font-medium text-white truncate pr-4">{faq.question}</div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="flex space-x-1">
                                            {idx > 0 && (
                                                <motion.button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        moveFaq(idx, 'up');
                                                    }}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-1 bg-gray-700/60 hover:bg-gray-700/90 text-gray-300 rounded transition-colors"
                                                >
                                                    <ChevronUpIcon className="h-5 w-5" />
                                                </motion.button>
                                            )}
                                            
                                            {idx < data.faqs.length - 1 && (
                                                <motion.button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        moveFaq(idx, 'down');
                                                    }}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-1 bg-gray-700/60 hover:bg-gray-700/90 text-gray-300 rounded transition-colors"
                                                >
                                                    <ChevronDownIcon className="h-5 w-5" />
                                                </motion.button>
                                            )}
                                        </div>
                                        
                                        <motion.button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFaq(idx);
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 rounded transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </motion.button>
                                        
                                        {activeItemIndex === idx ? (
                                            <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                                        )}
                                    </div>
                                </div>

                                {activeItemIndex === idx && (
                                    <div className="p-4 space-y-4 border-t border-gray-700/70">
                                        <div>
                                            <label className={labelClasses}>Питання:</label>
                                            <input
                                                type="text"
                                                className={inputClasses}
                                                value={faq.question}
                                                onChange={(e) => handleFaqUpdate(idx, 'question', e.target.value)}
                                                placeholder="Введіть питання"
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Відповідь:</label>
                                            <textarea
                                                className={`${inputClasses} h-32`}
                                                value={faq.answer}
                                                onChange={(e) => handleFaqUpdate(idx, 'answer', e.target.value)}
                                                placeholder="Введіть відповідь"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
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