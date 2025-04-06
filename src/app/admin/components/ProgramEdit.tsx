'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminPageData } from '@/contexts/AdminPageDataContext';
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

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
    const { pageData, loading, refreshData } = useAdminPageData();
    const [data, setData] = useState<ProgramData | null>(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isSaving, setIsSaving] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);

    useEffect(() => {
        if (pageData.program && !data) {
            setData(pageData.program as ProgramData);
        }
    }, [pageData, data]);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };
    
    const toggleModule = (idx: number) => {
        setActiveModuleIndex(activeModuleIndex === idx ? null : idx);
    };

    const handleModuleUpdate = (idx: number, field: keyof Omit<Module, 'topics'>, value: string | number) => {
        if (!data) return;
        
        const updatedModules = [...data.modules];
        updatedModules[idx] = { ...updatedModules[idx], [field]: value };
        
        setData({ ...data, modules: updatedModules });
    };

    const handleTopicUpdate = (moduleIdx: number, topicIdx: number, value: string) => {
        if (!data) return;
        
        const updatedModules = [...data.modules];
        const updatedTopics = [...updatedModules[moduleIdx].topics];
        updatedTopics[topicIdx] = value;
        updatedModules[moduleIdx] = { ...updatedModules[moduleIdx], topics: updatedTopics };
        
        setData({ ...data, modules: updatedModules });
    };

    const addModule = () => {
        if (!data) return;
        
        const maxId = data.modules.reduce((max, module) => Math.max(max, module.id), 0);
        const newModule: Module = {
            id: maxId + 1,
            title: 'Новий модуль',
            description: 'Опис модуля',
            topics: ['Тема 1']
        };
        
        setData({
            ...data,
            modules: [...data.modules, newModule]
        });
        
        setActiveModuleIndex(data.modules.length);
    };

    const removeModule = (idx: number) => {
        if (!data) return;
        
        const updatedModules = data.modules.filter((_, i) => i !== idx);
        setData({ ...data, modules: updatedModules });
        
        if (activeModuleIndex === idx) {
            setActiveModuleIndex(null);
        } else if (activeModuleIndex !== null && activeModuleIndex > idx) {
            setActiveModuleIndex(activeModuleIndex - 1);
        }
    };

    const addTopic = (moduleIdx: number) => {
        if (!data) return;
        
        const updatedModules = [...data.modules];
        updatedModules[moduleIdx] = {
            ...updatedModules[moduleIdx],
            topics: [...updatedModules[moduleIdx].topics, 'Нова тема']
        };
        
        setData({ ...data, modules: updatedModules });
    };

    const removeTopic = (moduleIdx: number, topicIdx: number) => {
        if (!data) return;
        
        const updatedModules = [...data.modules];
        updatedModules[moduleIdx] = {
            ...updatedModules[moduleIdx],
            topics: updatedModules[moduleIdx].topics.filter((_, i) => i !== topicIdx)
        };
        
        setData({ ...data, modules: updatedModules });
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
                body: JSON.stringify({ section: 'program', data })
            });

            const result = await response.json();
            
            setStatus(result.success ? 'success' : 'error');
            setMessage(result.success 
                ? 'Секцію &quot;Програма курсу&quot; оновлено успішно!' 
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
                <h2 className="text-2xl text-cyan-300 font-bold">Секція &quot;Програма курсу&quot;</h2>
                <div className="text-xs text-gray-400">ID: program</div>
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
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            placeholder="Введіть заголовок секції"
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Підзаголовок:</label>
                        <textarea
                            className={`${inputClasses} h-20`}
                            value={data.subtitle}
                            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                            placeholder="Введіть підзаголовок секції"
                        />
                    </div>
                </div>

                <div className={panelClasses}>
                    <div 
                        className={sectionHeaderClasses}
                        onClick={() => toggleSection('modules')}
                    >
                        <div className="text-lg text-cyan-100 font-medium">Модулі програми</div>
                        <div className="flex items-center">
                            <div className="mr-3 text-sm text-gray-400">
                                {data.modules.length} {data.modules.length === 1 ? 'модуль' : data.modules.length < 5 ? 'модулі' : 'модулів'}
                            </div>
                            {activeSection === 'modules' ? (
                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                            )}
                        </div>
                    </div>

                    {activeSection === 'modules' && (
                        <div className="mt-4 space-y-4">
                            <div className="flex justify-end">
                                <motion.button
                                    onClick={addModule}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 bg-cyan-600/60 hover:bg-cyan-600/80 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Додати модуль</span>
                                </motion.button>
                            </div>

                            {data.modules.map((module, idx) => (
                                <div key={idx} className="bg-gray-800/70 rounded-xl border border-gray-700/70 overflow-hidden">
                                    <div 
                                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/50"
                                        onClick={() => toggleModule(idx)}
                                    >
                                        <div className="flex items-center">
                                            <div className="bg-gray-700 text-gray-400 h-7 w-7 rounded-full flex items-center justify-center mr-3">
                                                {module.id}
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{module.title}</div>
                                                <div className="text-sm text-gray-400">{module.topics.length} {module.topics.length === 1 ? 'тема' : module.topics.length < 5 ? 'теми' : 'тем'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <motion.button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeModule(idx);
                                                }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 rounded transition-colors"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </motion.button>
                                            {activeModuleIndex === idx ? (
                                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                                            ) : (
                                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                                            )}
                                        </div>
                                    </div>

                                    {activeModuleIndex === idx && (
                                        <div className="p-4 space-y-4 border-t border-gray-700/70">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClasses}>ID модуля:</label>
                                                    <input
                                                        type="number"
                                                        className={inputClasses}
                                                        value={module.id}
                                                        onChange={(e) => handleModuleUpdate(idx, 'id', parseInt(e.target.value, 10) || 0)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={labelClasses}>Назва модуля:</label>
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={module.title}
                                                        onChange={(e) => handleModuleUpdate(idx, 'title', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className={labelClasses}>Опис модуля:</label>
                                                <textarea
                                                    className={`${inputClasses} h-20`}
                                                    value={module.description}
                                                    onChange={(e) => handleModuleUpdate(idx, 'description', e.target.value)}
                                                />
                                            </div>

                                            <div className="bg-gray-700/30 rounded-lg p-4 mt-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-cyan-100 font-medium">Теми модуля</h4>
                                                    <motion.button
                                                        onClick={() => addTopic(idx)}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="text-sm flex items-center space-x-1 text-green-400 bg-green-900/30 hover:bg-green-900/50 py-1 px-3 rounded transition-colors"
                                                    >
                                                        <PlusIcon className="h-3 w-3" />
                                                        <span>Додати тему</span>
                                                    </motion.button>
                                                </div>
                                                
                                                <div className="space-y-3">
                                                    {module.topics.map((topic, topicIdx) => (
                                                        <div key={topicIdx} className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                className={inputClasses}
                                                                value={topic}
                                                                onChange={(e) => handleTopicUpdate(idx, topicIdx, e.target.value)}
                                                                placeholder={`Тема ${topicIdx + 1}`}
                                                            />
                                                            <motion.button
                                                                onClick={() => removeTopic(idx, topicIdx)}
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