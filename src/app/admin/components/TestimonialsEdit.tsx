'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminPageData } from '@/contexts/AdminPageDataContext';
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface Testimonial {
    id: number | string;
    rating: number;
    content: string;
    name: string;
    position: string;
    image: string;
}

interface TestimonialsData {
    testimonials: Testimonial[];
}

export default function TestimonialsEdit() {
    const { pageData, loading, refreshData } = useAdminPageData();
    const [data, setData] = useState<TestimonialsData | null>(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isSaving, setIsSaving] = useState(false);
    const [activeTestimonialIndex, setActiveTestimonialIndex] = useState<number | null>(null);

    useEffect(() => {
        if (pageData.testimonials && !data) {
            setData(pageData.testimonials as TestimonialsData);
        }
    }, [pageData, data]);

    const toggleTestimonial = (idx: number) => {
        setActiveTestimonialIndex(activeTestimonialIndex === idx ? null : idx);
    };

    const handleTestimonialUpdate = (idx: number, field: keyof Testimonial, value: string | number) => {
        if (!data) return;
        
        const updatedTestimonials = [...data.testimonials];
        updatedTestimonials[idx] = { ...updatedTestimonials[idx], [field]: value };
        
        setData({ ...data, testimonials: updatedTestimonials });
    };

    const addTestimonial = () => {
        if (!data) return;
        
        const maxId = data.testimonials.reduce((max, testimonial) => {
            const id = typeof testimonial.id === 'number' ? testimonial.id : parseInt(testimonial.id as string, 10);
            return Math.max(max, isNaN(id) ? 0 : id);
        }, 0);
        
        const newTestimonial: Testimonial = {
            id: maxId + 1,
            rating: 5,
            content: 'Дуже корисний курс!',
            name: 'Нове ім\'я',
            position: 'Посада',
            image: '/avatar-placeholder.jpg'
        };
        
        setData({
            ...data,
            testimonials: [...data.testimonials, newTestimonial]
        });
        
        setActiveTestimonialIndex(data.testimonials.length);
    };

    const removeTestimonial = (idx: number) => {
        if (!data) return;
        
        const updatedTestimonials = data.testimonials.filter((_, i) => i !== idx);
        setData({ ...data, testimonials: updatedTestimonials });
        
        if (activeTestimonialIndex === idx) {
            setActiveTestimonialIndex(null);
        } else if (activeTestimonialIndex !== null && activeTestimonialIndex > idx) {
            setActiveTestimonialIndex(activeTestimonialIndex - 1);
        }
    };

    const handleRatingChange = (idx: number, rating: number) => {
        handleTestimonialUpdate(idx, 'rating', rating);
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
                body: JSON.stringify({ section: 'testimonials', data })
            });

            const result = await response.json();
            
            setStatus(result.success ? 'success' : 'error');
            setMessage(result.success 
                ? 'Секцію &quot;Відгуки&quot; оновлено успішно!' 
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
                <h2 className="text-2xl text-cyan-300 font-bold">Секція &quot;Відгуки&quot;</h2>
                <div className="text-xs text-gray-400">ID: testimonials</div>
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
                        <div className="text-lg text-cyan-100 font-medium">Відгуки користувачів</div>
                        <motion.button
                            onClick={addTestimonial}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center space-x-2 bg-cyan-600/60 hover:bg-cyan-600/80 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                            <PlusIcon className="h-4 w-4" />
                            <span>Додати відгук</span>
                        </motion.button>
                    </div>

                    <div className="space-y-4">
                        {data.testimonials.map((testimonial, idx) => (
                            <div key={idx} className="bg-gray-800/70 rounded-xl border border-gray-700/70 overflow-hidden">
                                <div 
                                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/50"
                                    onClick={() => toggleTestimonial(idx)}
                                >
                                    <div className="flex items-center">
                                        <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-700 flex-shrink-0">
                                            {testimonial.image ? (
                                                <Image 
                                                    src={testimonial.image} 
                                                    alt={testimonial.name}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                                                    <span>?</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{testimonial.name}</div>
                                            <div className="text-sm text-gray-400">{testimonial.position}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star}>
                                                    {star <= testimonial.rating ? (
                                                        <StarIconSolid className="h-4 w-4 text-yellow-400" />
                                                    ) : (
                                                        <StarIcon className="h-4 w-4 text-yellow-400" />
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                        <motion.button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeTestimonial(idx);
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 rounded transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </motion.button>
                                        {activeTestimonialIndex === idx ? (
                                            <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                                        )}
                                    </div>
                                </div>

                                {activeTestimonialIndex === idx && (
                                    <div className="p-4 space-y-4 border-t border-gray-700/70">
                                        <div>
                                            <label className={labelClasses}>Імʼя:</label>
                                            <input
                                                type="text"
                                                className={inputClasses}
                                                value={testimonial.name}
                                                onChange={(e) => handleTestimonialUpdate(idx, 'name', e.target.value)}
                                                placeholder="Імʼя автора відгуку"
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Посада:</label>
                                            <input
                                                type="text"
                                                className={inputClasses}
                                                value={testimonial.position}
                                                onChange={(e) => handleTestimonialUpdate(idx, 'position', e.target.value)}
                                                placeholder="Посада автора відгуку"
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Відгук:</label>
                                            <textarea
                                                className={`${inputClasses} h-32`}
                                                value={testimonial.content}
                                                onChange={(e) => handleTestimonialUpdate(idx, 'content', e.target.value)}
                                                placeholder="Текст відгуку"
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>URL фото:</label>
                                            <input
                                                type="text"
                                                className={inputClasses}
                                                value={testimonial.image}
                                                onChange={(e) => handleTestimonialUpdate(idx, 'image', e.target.value)}
                                                placeholder="URL до фотографії"
                                            />
                                            {testimonial.image && (
                                                <div className="mt-2 max-w-[100px] bg-gray-900/50 p-1 border border-gray-700 rounded">
                                                    <Image 
                                                        src={testimonial.image} 
                                                        alt={testimonial.name}
                                                        width={100}
                                                        height={100}
                                                        className="w-full h-auto rounded"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = '/avatar-placeholder.jpg';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Рейтинг:</label>
                                            <div className="flex items-center space-x-2 mt-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => handleRatingChange(idx, star)}
                                                        className="focus:outline-none"
                                                    >
                                                        {star <= testimonial.rating ? (
                                                            <StarIconSolid className="h-8 w-8 text-yellow-400" />
                                                        ) : (
                                                            <StarIcon className="h-8 w-8 text-yellow-400" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
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