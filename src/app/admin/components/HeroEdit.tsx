'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminPageData } from '@/contexts/AdminPageDataContext';
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface CourseType {
    title: string;
    description: string;
    originalPrice: string;
    price: string;
    discount: string;
    recommended?: boolean;
    features: string[];
    link: string;
}

interface HeroData {
    title: string;
    subtitle: string;
    discountBanner: string;
    courseTypes: CourseType[];
    leadMagnet: string;
}

export default function HeroEdit() {
    const { pageData, loading, refreshData } = useAdminPageData();
    const [data, setData] = useState<HeroData | null>(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isSaving, setIsSaving] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [activeCourseIndex, setActiveCourseIndex] = useState<number | null>(null);

    useEffect(() => {
        if (pageData.hero && !data) {
            setData(pageData.hero as HeroData);
        }
    }, [pageData, data]);

    const handleCourseUpdate = (idx: number, field: keyof CourseType, value: string | boolean) => {
        if (!data) return;
        
        const updatedCourses = [...data.courseTypes];
        updatedCourses[idx] = { ...updatedCourses[idx], [field]: value };
        
        setData({ ...data, courseTypes: updatedCourses });
    };

    const handleFeatureUpdate = (courseIdx: number, featureIdx: number, value: string) => {
        if (!data) return;
        
        const updatedCourses = [...data.courseTypes];
        const updatedFeatures = [...updatedCourses[courseIdx].features];
        updatedFeatures[featureIdx] = value;
        updatedCourses[courseIdx] = { ...updatedCourses[courseIdx], features: updatedFeatures };
        
        setData({ ...data, courseTypes: updatedCourses });
    };

    const addFeature = (courseIdx: number) => {
        if (!data) return;
        
        const updatedCourses = [...data.courseTypes];
        const updatedFeatures = [...updatedCourses[courseIdx].features, ''];
        updatedCourses[courseIdx] = { ...updatedCourses[courseIdx], features: updatedFeatures };
        
        setData({ ...data, courseTypes: updatedCourses });
    };

    const removeFeature = (courseIdx: number, featureIdx: number) => {
        if (!data) return;
        
        const updatedCourses = [...data.courseTypes];
        const updatedFeatures = updatedCourses[courseIdx].features.filter((_, i) => i !== featureIdx);
        updatedCourses[courseIdx] = { ...updatedCourses[courseIdx], features: updatedFeatures };
        
        setData({ ...data, courseTypes: updatedCourses });
    };

    const addCourseType = () => {
        if (!data) return;
        
        const newCourse: CourseType = {
            title: 'Новий курс',
            description: 'Опис курсу',
            originalPrice: '999 ₴',
            price: '499 ₴',
            discount: '50%',
            features: ['Особливість 1'],
            link: 'https://example.com',
            recommended: false
        };
        
        setData({ ...data, courseTypes: [...data.courseTypes, newCourse] });
        setActiveCourseIndex(data.courseTypes.length);
    };

    const removeCourseType = (idx: number) => {
        if (!data) return;
        
        const updatedCourses = data.courseTypes.filter((_, i) => i !== idx);
        setData({ ...data, courseTypes: updatedCourses });
        
        if (activeCourseIndex === idx) {
            setActiveCourseIndex(null);
        } else if (activeCourseIndex !== null && activeCourseIndex > idx) {
            setActiveCourseIndex(activeCourseIndex - 1);
        }
    };

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const toggleCourse = (idx: number) => {
        setActiveCourseIndex(activeCourseIndex === idx ? null : idx);
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
                body: JSON.stringify({ section: 'hero', data })
            });

            const result = await response.json();
            
            setStatus(result.success ? 'success' : 'error');
            setMessage(result.success 
                ? 'Hero секцію оновлено успішно!' 
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
                <h2 className="text-2xl text-cyan-300 font-bold">Hero Секція</h2>
                <div className="text-xs text-gray-400">ID: hero</div>
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

                    <div className="mb-4">
                        <label className={labelClasses}>Підзаголовок:</label>
                        <textarea
                            className={`${inputClasses} h-24`}
                            value={data.subtitle}
                            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                            placeholder="Введіть підзаголовок секції"
                        />
                    </div>

                    <div className="mb-4">
                        <label className={labelClasses}>Банер знижки:</label>
                        <input
                            type="text"
                            className={inputClasses}
                            value={data.discountBanner}
                            onChange={(e) => setData({ ...data, discountBanner: e.target.value })}
                            placeholder="Текст банера знижки"
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Лід-магніт:</label>
                        <textarea
                            className={`${inputClasses} h-24`}
                            value={data.leadMagnet}
                            onChange={(e) => setData({ ...data, leadMagnet: e.target.value })}
                            placeholder="Текст лід-магніту"
                        />
                    </div>
                </div>

                <div className={panelClasses}>
                    <div 
                        className={sectionHeaderClasses}
                        onClick={() => toggleSection('courses')}
                    >
                        <div className="text-lg text-cyan-100 font-medium">Тарифні плани</div>
                        <div className="flex items-center">
                            <div className="mr-3 text-sm text-gray-400">
                                {data.courseTypes.length} {data.courseTypes.length === 1 ? 'план' : data.courseTypes.length < 5 ? 'плани' : 'планів'}
                            </div>
                            {activeSection === 'courses' ? (
                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                            )}
                        </div>
                    </div>

                    {activeSection === 'courses' && (
                        <div className="mt-4 space-y-4">
                            <div className="flex justify-end">
                                <motion.button
                                    onClick={addCourseType}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 bg-cyan-600/60 hover:bg-cyan-600/80 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Додати тарифний план</span>
                                </motion.button>
                            </div>

                            {data.courseTypes.map((course, idx) => (
                                <div key={idx} className="bg-gray-800/70 rounded-xl border border-gray-700/70 overflow-hidden">
                                    <div 
                                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/50"
                                        onClick={() => toggleCourse(idx)}
                                    >
                                        <div className="flex items-center">
                                            <div className="bg-gray-700 text-gray-400 h-7 w-7 rounded-full flex items-center justify-center mr-3">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{course.title}</div>
                                                <div className="text-sm text-gray-400">{course.price} {course.recommended && '• Рекомендований'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <motion.button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeCourseType(idx);
                                                }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 rounded transition-colors"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </motion.button>
                                            {activeCourseIndex === idx ? (
                                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                                            ) : (
                                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                                            )}
                                        </div>
                                    </div>

                                    {activeCourseIndex === idx && (
                                        <div className="p-4 space-y-4 border-t border-gray-700/70">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClasses}>Назва:</label>
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={course.title}
                                                        onChange={(e) => handleCourseUpdate(idx, 'title', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={labelClasses}>Посилання:</label>
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={course.link}
                                                        onChange={(e) => handleCourseUpdate(idx, 'link', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className={labelClasses}>Опис:</label>
                                                <textarea
                                                    className={`${inputClasses} h-20`}
                                                    value={course.description}
                                                    onChange={(e) => handleCourseUpdate(idx, 'description', e.target.value)}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className={labelClasses}>Стара ціна:</label>
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={course.originalPrice}
                                                        onChange={(e) => handleCourseUpdate(idx, 'originalPrice', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={labelClasses}>Нова ціна:</label>
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={course.price}
                                                        onChange={(e) => handleCourseUpdate(idx, 'price', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={labelClasses}>Знижка:</label>
                                                    <input
                                                        type="text"
                                                        className={inputClasses}
                                                        value={course.discount}
                                                        onChange={(e) => handleCourseUpdate(idx, 'discount', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 py-2">
                                                <input
                                                    type="checkbox"
                                                    id={`recommended-${idx}`}
                                                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-cyan-600 focus:ring-cyan-500"
                                                    checked={course.recommended ?? false}
                                                    onChange={(e) => handleCourseUpdate(idx, 'recommended', e.target.checked)}
                                                />
                                                <label htmlFor={`recommended-${idx}`} className="text-cyan-100">
                                                    Рекомендований тариф
                                                </label>
                                            </div>

                                            <div className="bg-gray-700/30 rounded-lg p-4 mt-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-cyan-100 font-medium">Особливості курсу</h4>
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
                                                    {course.features.map((feature, featureIdx) => (
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