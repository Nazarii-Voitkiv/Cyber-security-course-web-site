'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, HomeIcon, BriefcaseIcon, CommandLineIcon, ComputerDesktopIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const iconsMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  UserIcon,
  HomeIcon,
  BriefcaseIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  AcademicCapIcon
};

interface Group {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
}

interface ForWhomData {
  title: string;
  groups: Group[];
}

export default function ForWhomSection() {
  const [data, setData] = useState<ForWhomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/forwhom/get')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setData(json.data);
        } else {
          setError('Не вдалося завантажити ForWhom');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Помилка завантаження ForWhom');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-cyan-200">Завантаження ForWhom...</div>;
  }

  if (error || !data) {
    return <div className="text-center py-10 text-red-400">{error}</div>;
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.groups.map((group, idx) => {
              const Icon = iconsMap[group.icon as keyof typeof iconsMap];
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
                    <div className={`${group.bgColor} p-4 rounded-full w-fit mx-auto mb-6 
                                  transition-transform duration-300 group-hover:scale-110`}>
                      {Icon && <Icon className={`h-12 w-12 ${group.iconColor}`} />}
                    </div>
                    <h3 className="text-xl font-semibold mb-4 flex-shrink-0">{group.title}</h3>
                    <p className="text-gray-400 flex-grow">
                      {group.description}
                    </p>
                  </div>

                  {/* Світловий ефект при ховері */}
                  <div className={`absolute -inset-0.5 ${group.bgColor} opacity-0 group-hover:opacity-20 
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