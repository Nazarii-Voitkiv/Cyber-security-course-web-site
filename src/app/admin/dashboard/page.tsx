'use client';

import { useEffect } from 'react';

import { motion } from 'framer-motion';

export default function AdminDashboard() {
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
                console.log('Logged out successfully');
                window.location.href = '/admin';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 py-10">
                <div className="flex justify-between mb-8">
                    <h1 className="text-3xl font-bold text-cyan-400">Адмін-панель</h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Вийти
                    </motion.button>
                </div>

                <div className="space-y-8">
                    
                </div>
            </div>
        </section>
    );
}