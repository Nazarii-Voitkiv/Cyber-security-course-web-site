// app/admin/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = document.cookie.includes('isAuthenticated=true');
        if (!isAuthenticated) router.push('/admin');
    }, [router]);

    const handleLogout = () => {
        document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/admin');
    };

    return (
        <section className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')]" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />

            <div className="container mx-auto px-4 relative py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="flex justify-between items-center mb-12 p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Панель управління
                        </h1>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="px-6 py-2 bg-red-500/20 border border-red-400 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors"
                        >
                            Вийти
                        </motion.button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm"
                    >
                        <h2 className="text-2xl font-semibold mb-8 text-cyan-100">
                            Редагування контенту
                        </h2>

                        <div className="p-6 bg-gray-700/30 rounded-lg border border-gray-600">
                            <h3 className="text-lg font-semibold mb-4 text-cyan-100">Секції сайту</h3>
                            <p className="text-gray-400">Тут буде форма редагування...</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}