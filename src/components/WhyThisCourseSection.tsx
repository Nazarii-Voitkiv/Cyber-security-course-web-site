'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LightBulbIcon, ShieldCheckIcon, BanknotesIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Reason {
    title: string;
    description: string;
    icon: string;  // "LightBulbIcon"
    color: string;
    bgColor: string;
}

interface WhyCourseData {
    title: string;
    reasons: Reason[];
}

const iconsMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    LightBulbIcon,
    ShieldCheckIcon,
    BanknotesIcon,
    ExclamationTriangleIcon
};

export default function WhyThisCourseSection() {
    const [data, setData] = useState<WhyCourseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/whycourse/get')
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    setData(json.data);
                } else {
                    setError('Не вдалося завантажити WhyCourse');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Помилка завантаження WhyCourse');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-cyan-200">Завантаження WhyCourse...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-400">{error}</div>;
    }

    if (!data) {
        return null;
    }

    return (
        <section className="py-20 bg-gray-800/50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="container mx-auto px-4"
            >
                <div className="text-center max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                        {data.title}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {data.reasons.map((reason, index) => {
                            const IconComponent = iconsMap[reason.icon] || LightBulbIcon; // fallback

                            return (
                                <motion.div
                                    key={reason.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative group h-full"
                                >
                                    <div className="relative p-8 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl transition-all duration-300 group-hover:scale-[1.02] h-full flex flex-col items-center group-hover:bg-cyan-500/10">
                                        <div className="mb-4">
                                            <IconComponent className={`h-12 w-12 ${reason.color} transition-transform duration-300 group-hover:scale-110`} />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-4 text-white text-center">{reason.title}</h3>
                                        <p className="text-gray-400 text-center">{reason.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
