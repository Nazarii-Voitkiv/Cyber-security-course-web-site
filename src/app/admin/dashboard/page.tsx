'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AdminPageDataProvider } from '@/contexts/AdminPageDataContext';
import HeroEdit from '@/app/admin/components/HeroEdit';
import IntroEdit from '@/app/admin/components/IntroEdit';
import WhyThisCourseEdit from '@/app/admin/components/WhyThisCourseEdit';
import BenefitsEdit from '@/app/admin/components/BenefitsEdit';
import ForWhomEdit from '@/app/admin/components/ForWhomEdit';
import LearningProcessEdit from '@/app/admin/components/LearningProcessEdit';
import ProgramEdit from '@/app/admin/components/ProgramEdit';
import ComparePlansEdit from '@/app/admin/components/ComparePlansEdit';
import TestimonialsEdit from '@/app/admin/components/TestimonialsEdit';
import FaqEdit from '@/app/admin/components/FaqEdit';
import FooterEdit from '@/app/admin/components/FooterEdit';

export default function AdminDashboard() {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/verify', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    window.location.href = '/admin';
                }
            } catch (error) {
                console.error('Auth check error:', error);
                window.location.href = '/admin';
            }
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = '/admin';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AdminPageDataProvider>
            <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
                <div className="container mx-auto px-4 py-10">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-cyan-400">Адмін-панель</h1>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                        >
                            Вийти
                        </motion.button>
                    </div>

                    <div className="mb-8 p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg border border-blue-800/30">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-cyan-400 font-medium">Статус кешу</h3>
                                <p className="text-sm text-gray-300">Всі зміни автоматично скидають кеш сайту</p>
                            </div>
                            <button
                                onClick={async () => {
                                    try {
                                        const response = await fetch('/api/revalidate-cache', { method: 'POST' });
                                        if (response.ok) {
                                            setMessage('Кеш успішно скинуто');
                                            setStatus('success');
                                        }
                                    } catch (error) {
                                        console.error('Failed to invalidate cache:', error);
                                    }
                                }}
                                className="bg-cyan-700/50 hover:bg-cyan-700/80 text-cyan-100 py-2 px-4 rounded-lg font-medium text-sm"
                            >
                                Примусово скинути кеш
                            </button>
                        </div>
                        
                        {message && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-4 p-3 rounded ${
                                    status === 'success' ? 'bg-green-900/40 text-green-400 border border-green-500/40' : 
                                    status === 'error' ? 'bg-red-900/40 text-red-400 border border-red-500/40' : 
                                    'bg-gray-700/40 text-gray-300'
                                }`}
                            >
                                {message}
                            </motion.div>
                        )}
                    </div>

                    <div className="space-y-8">
                        <HeroEdit />
                        <IntroEdit />
                        <WhyThisCourseEdit />
                        <BenefitsEdit />
                        <ForWhomEdit />
                        <LearningProcessEdit />
                        <ProgramEdit />
                        <ComparePlansEdit />
                        <TestimonialsEdit />
                        <FaqEdit />
                        <FooterEdit />
                    </div>
                </div>
            </section>
        </AdminPageDataProvider>
    );
}