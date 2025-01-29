'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  AcademicCapIcon, 
  ChatBubbleBottomCenterTextIcon, 
  DocumentCheckIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const iconsMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  ShieldCheckIcon,
  AcademicCapIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentCheckIcon,
  ClockIcon,
  UserGroupIcon
};

interface Benefit {
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface BenefitsData {
  benefits: Benefit[];
}

export default function BenefitsSection() {
  const [data, setData] = useState<BenefitsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/benefits/get')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setData(json.data);
        } else {
          setError('Не вдалося завантажити Benefits');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Помилка завантаження Benefits');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-cyan-200">Завантаження Benefits...</div>;
  }

  if (error || !data) {
    return <div className="text-center py-10 text-red-400">{error}</div>;
  }

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Що ви отримаєте?
          </h2>
          <p className="text-xl text-gray-400">
            Практичні знання та інструменти для безпечного життя в цифровому світі
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {data.benefits.map((benefit, idx) => {
            const Icon = iconsMap[benefit.icon as keyof typeof iconsMap];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative group h-full"
              >
                <div className="p-8 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl 
                               transition-transform duration-300 group-hover:scale-[1.02] h-full flex flex-col">
                  <div className={`${benefit.bgColor} p-4 rounded-full w-fit mb-6 
                                  transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
                    {Icon && <Icon className={`h-8 w-8 ${benefit.color}`} />}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white flex-shrink-0">{benefit.title}</h3>
                  <p className="text-gray-400 flex-grow">{benefit.description}</p>
                </div>
                
                {/* Subtle glow effect on hover */}
                <div className={`absolute -inset-0.5 ${benefit.bgColor} opacity-0 group-hover:opacity-20 
                                rounded-xl blur transition duration-300`} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
