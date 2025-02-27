'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt:', { username, passwordLength: password.length });
        
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            console.log('Login response:', { status: res.status, data });

            if (!res.ok) {
                setError(data.error || 'Помилка входу');
                setTimeout(() => setError(''), 3000);
                return;
            }

            if (data.token) {
                console.log('Login successful, redirecting to dashboard...');
                window.location.href = '/admin/dashboard';
            } else {
                console.error('No token received from server');
                setError('Помилка автентифікації');
                setTimeout(() => setError(''), 3000);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Щось пішло не так');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <section className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-4 relative pt-32"
            >
                <form onSubmit={handleLogin} className="max-w-md mx-auto bg-gray-800/50 p-8 rounded-xl border border-gray-700 backdrop-blur-sm">
                    <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Адмін-вхід
                    </h1>

                    <div className="mb-6">
                        <label className="block text-cyan-100 mb-3">Логін:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white"
                            required
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-cyan-100 mb-3">Пароль:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white"
                            required
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-6 p-3 bg-red-900/50 border border-red-400 rounded-lg text-red-300"
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                    >
                        Увійти
                    </motion.button>
                </form>
            </motion.div>
        </section>
    );
}