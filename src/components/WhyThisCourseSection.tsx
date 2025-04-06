'use client';

import { motion } from 'framer-motion';
import { ShieldCheckIcon, LightBulbIcon, BanknotesIcon, ExclamationTriangleIcon, CodeBracketIcon, CloudIcon } from '@heroicons/react/24/outline';
import CustomMarkdown from "@/utils/CustomMarkdown";
import { usePageData } from '@/contexts/PageDataContext';

interface Reason {
    title: string;
    description: string;
}

interface WhyThisCourseData {
    title: string;
    reasons: Reason[];
}

const getIconByIndex = (index: number) => {
    const icons = [
        {
            Icon: LightBulbIcon,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/10'
        },
        {
            Icon: ShieldCheckIcon,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/10'
        },
        {
            Icon: BanknotesIcon,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/10'
        },
        {
            Icon: ExclamationTriangleIcon,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/10'
        },
        {
            Icon: CodeBracketIcon,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/10'
        },
        {
            Icon: CloudIcon,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/10'
        }
    ];
    
    return icons[index % icons.length];
};

export default function WhyThisCourseSection() {
    const { pageData } = usePageData();
    const whyThisCourseData = pageData.whyThisCourse as unknown;

    if (!whyThisCourseData) return null;

    const isWhyThisCourseData = (data: unknown): data is WhyThisCourseData => {
        if (typeof data !== 'object' || data === null) return false;
        
        const obj = data as Record<string, unknown>;
        return (
            typeof obj.title === 'string' &&
            Array.isArray(obj.reasons) &&
            obj.reasons.every(item => {
                if (typeof item !== 'object' || item === null) return false;
                const reason = item as Record<string, unknown>;
                return (
                    typeof reason.title === 'string' &&
                    typeof reason.description === 'string'
                );
            })
        );
    };

    if (!isWhyThisCourseData(whyThisCourseData)) {
        console.error("WhyThisCourse data structure is invalid");
        return null;
    }

    const data: WhyThisCourseData = whyThisCourseData;
    
    const getGridCols = (count: number) => {
        if (count === 1) return 'md:grid-cols-1';
        if (count === 2) return 'md:grid-cols-2';
        if (count === 3) return 'md:grid-cols-3';
        if (count === 4) return 'md:grid-cols-2 lg:grid-cols-2';
        return 'md:grid-cols-2 lg:grid-cols-3';
    };

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

                    <div className={`grid ${getGridCols(data.reasons.length)} gap-8`}>
                        {data.reasons.map((reason, index) => {
                            const { Icon, color, bgColor } = getIconByIndex(index);
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative group h-full"
                                >
                                    <div className="p-8 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl
                                  transition-transform duration-300 group-hover:scale-[1.02] h-full flex flex-col items-center">
                                        <div className="mb-4">
                                            <Icon className={`h-12 w-12 ${color} transition-transform duration-300 group-hover:scale-110`} />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-4 text-white text-center"><CustomMarkdown>{reason.title}</CustomMarkdown></h3>
                                        <p className="text-gray-400 text-center"><CustomMarkdown>{reason.description}</CustomMarkdown></p>
                                    </div>

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