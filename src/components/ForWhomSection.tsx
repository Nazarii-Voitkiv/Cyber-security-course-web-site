'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    UserIcon,
    HomeIcon,
    BriefcaseIcon,
    CommandLineIcon,
    ComputerDesktopIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline';
import CustomMarkdown from "@/utils/CustomMarkdown";

const icons = [
    {
        Icon: UserIcon,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/10'
    },
    {
        Icon: HomeIcon,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10'
    },
    {
        Icon: BriefcaseIcon,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10'
    },
    {
        Icon: CommandLineIcon,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10'
    },
    {
        Icon: ComputerDesktopIcon,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10'
    },
    {
        Icon: AcademicCapIcon,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10'
    }
];

interface ForWhomData {
    title: string;
    groups: {
        title: string;
        description: string;
    }[];
}

export default function ForWhomSection() {
    const [data, setData] = useState<ForWhomData | null>(null);

    useEffect(() => {
        fetch('/api/forwhom/get')
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    setData(data.data);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    if (!data) return null;

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
                      <CustomMarkdown>{data.title}</CustomMarkdown>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.groups.map((group, index) => {
                            const { Icon, color, bgColor } = icons[index];
                            return (
                                <motion.div
                                    key={group.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative group h-full"
                                >
                                    <div className="p-8 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl
                                    transition-transform duration-300 group-hover:scale-[1.02] h-full flex flex-col">
                                        <div className={`${bgColor} p-4 rounded-full w-fit mx-auto mb-6 
                                            transition-transform duration-300 group-hover:scale-110`}>
                                            <Icon className={`h-12 w-12 ${color}`} />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-4"><CustomMarkdown>{group.title}</CustomMarkdown></h3>
                                        <p className="text-gray-400 flex-grow">
                                          <CustomMarkdown>{group.description}</CustomMarkdown>
                                        </p>
                                    </div>

                                    {/* Світловий ефект при ховері */}
                                    <div className={`absolute -inset-0.5 ${bgColor} opacity-0 group-hover:opacity-20 
                                        rounded-xl blur transition duration-300`} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}