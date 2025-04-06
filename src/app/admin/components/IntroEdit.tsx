'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminPageData } from '@/contexts/AdminPageDataContext';
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

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
    const { pageData, loading, refreshData } = useAdminPageData();
    const [data, setData] = useState<IntroData | null>(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isSaving, setIsSaving] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        if (pageData.intro && !data) {
            setData(pageData.intro as IntroData);
        }
    }, [pageData, data]);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const handleParagraphUpdate = (idx: number, value: string) => {
        if (!data) return;
        
        const updatedParagraphs = [...data.paragraphs];
        updatedParagraphs[idx] = value;
        
        setData({ ...data, paragraphs: updatedParagraphs });
    };

    const addParagraph = () => {
        if (!data) return;
        
        setData({
            ...data,
            paragraphs: [...data.paragraphs, '']
        });
    };

    const removeParagraph = (idx: number) => {
        if (!data) return;
        
        const updatedParagraphs = data.paragraphs.filter((_, i) => i !== idx);
        setData({ ...data, paragraphs: updatedParagraphs });
    };

    const handlePointUpdate = (idx: number, field: keyof IntroPoint, value: string) => {
        if (!data) return;
        
        const updatedPoints = [...data.points];
        updatedPoints[idx] = { ...updatedPoints[idx], [field]: value };
        
        setData({ ...data, points: updatedPoints });
    };

    const addPoint = () => {
        if (!data) return;
        
        const newPoint: IntroPoint = {
            title: 'Новий пункт',
            description: 'Опис пункту'
        };
        
        setData({
            ...data,
            points: [...data.points, newPoint]
        });
    };

    const removePoint = (idx: number) => {
        if (!data) return;
        
        const updatedPoints = data.points.filter((_, i) => i !== idx);
        setData({ ...data, points: updatedPoints });
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
                body: JSON.stringify({ section: 'intro', data })
            });

            const result = await response.json();
            
            setStatus(result.success ? 'success' : 'error');
            setMessage(result.success 
                ? 'Intro секцію оновлено успішно!' 
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
                <h2 className="text-2xl text-cyan-300 font-bold">Intro Секція</h2>
                <div className="text-xs text-gray-400">ID: intro</div>
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
                    
                    <div className="mb-4">
                        <label className={labelClasses}>Заголовок:</label>
                        <input
                            type="text"
                            className={inputClasses}
                            value={data.mainTitle}
                            onChange={(e) => setData({ ...data, mainTitle: e.target.value })}
                            placeholder="Введіть головний заголовок"
                        />
                    </div>

                    <div className="mb-4">
                        <label className={labelClasses}>Підзаголовок:</label>
                        <textarea
                            className={`${inputClasses} h-24`}
                            value={data.mainSubtitle}
                            onChange={(e) => setData({ ...data, mainSubtitle: e.target.value })}
                            placeholder="Введіть підзаголовок"
                        />
                    </div>
                </div>

                <div className={panelClasses}>
                    <div 
                        className={sectionHeaderClasses}
                        onClick={() => toggleSection('paragraphs')}
                    >
                        <div className="text-lg text-cyan-100 font-medium">Абзаци</div>
                        <div className="flex items-center">
                            <div className="mr-3 text-sm text-gray-400">
                                {data.paragraphs.length} {data.paragraphs.length === 1 ? 'абзац' : data.paragraphs.length < 5 ? 'абзаци' : 'абзаців'}
                            </div>
                            {activeSection === 'paragraphs' ? (
                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                            )}
                        </div>
                    </div>

                    {activeSection === 'paragraphs' && (
                        <div className="mt-4 space-y-4">
                            <div className="flex justify-end">
                                <motion.button
                                    onClick={addParagraph}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 bg-cyan-600/60 hover:bg-cyan-600/80 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Додати абзац</span>
                                </motion.button>
                            </div>

                            {data.paragraphs.map((paragraph, idx) => (
                                <div key={idx} className="bg-gray-800/70 rounded-xl border border-gray-700/70 p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-cyan-100 font-medium">Абзац {idx + 1}</div>
                                        <motion.button
                                            onClick={() => removeParagraph(idx)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 rounded transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </motion.button>
                                    </div>
                                    <textarea
                                        className={`${inputClasses} h-32`}
                                        value={paragraph}
                                        onChange={(e) => handleParagraphUpdate(idx, e.target.value)}
                                        placeholder={`Текст абзацу ${idx + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={panelClasses}>
                    <div 
                        className={sectionHeaderClasses}
                        onClick={() => toggleSection('points')}
                    >
                        <div className="text-lg text-cyan-100 font-medium">Ключові пункти</div>
                        <div className="flex items-center">
                            <div className="mr-3 text-sm text-gray-400">
                                {data.points.length} {data.points.length === 1 ? 'пункт' : data.points.length < 5 ? 'пункти' : 'пунктів'}
                            </div>
                            {activeSection === 'points' ? (
                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                            )}
                        </div>
                    </div>

                    {activeSection === 'points' && (
                        <div className="mt-4 space-y-4">
                            <div className="flex justify-end">
                                <motion.button
                                    onClick={addPoint}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 bg-cyan-600/60 hover:bg-cyan-600/80 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Додати пункт</span>
                                </motion.button>
                            </div>

                            {data.points.map((point, idx) => (
                                <div key={idx} className="bg-gray-800/70 rounded-xl border border-gray-700/70 p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-cyan-100 font-medium">Пункт {idx + 1}</div>
                                        <motion.button
                                            onClick={() => removePoint(idx)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 rounded transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </motion.button>
                                    </div>
                                    <div className="mb-3">
                                        <label className={labelClasses}>Заголовок:</label>
                                        <input
                                            type="text"
                                            className={inputClasses}
                                            value={point.title}
                                            onChange={(e) => handlePointUpdate(idx, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Опис:</label>
                                        <textarea
                                            className={`${inputClasses} h-24`}
                                            value={point.description}
                                            onChange={(e) => handlePointUpdate(idx, 'description', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={panelClasses}>
                    <div className={`${labelClasses} text-lg mb-4`}>Висновок</div>
                    <textarea
                        className={`${inputClasses} h-24`}
                        value={data.conclusion}
                        onChange={(e) => setData({ ...data, conclusion: e.target.value })}
                        placeholder="Введіть заключний текст"
                    />
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