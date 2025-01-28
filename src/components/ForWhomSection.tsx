'use client';

import { motion } from 'framer-motion';
import { UserIcon, HomeIcon, BriefcaseIcon, CommandLineIcon, ComputerDesktopIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const groups = [
  {
    title: 'Підлітки',
    description: 'Навчаться безпечно користуватися соцмережами, розпізнавати шахрайські схеми та захищати особисті дані.',
    Icon: UserIcon,
    iconColor: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10'
  },
  {
    title: 'Батьки',
    description: 'Зрозуміють, як захистити дітей в інтернеті, контролювати їх активність та створити безпечне цифрове середовище.',
    Icon: HomeIcon,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Бізнес-менеджери',
    description: 'Захистять конфіденційні дані компанії, навчаться розпізнавати кіберзагрози та впроваджувати протоколи безпеки.',
    Icon: BriefcaseIcon,
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  },
  {
    title: 'IT-початківці',
    description: 'Отримають базові знання з кібербезпеки, які необхідні для старту кар\'єри в IT та розуміння основних принципів захисту.',
    Icon: CommandLineIcon,
    iconColor: 'text-green-400',
    bgColor: 'bg-green-500/10'
  },
  {
    title: 'Офісні працівники',
    description: 'Навчаться захищати робочі дані, розпізнавати фішингові атаки та дотримуватися правил цифрової гігієни.',
    Icon: ComputerDesktopIcon,
    iconColor: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10'
  },
  {
    title: 'Студенти',
    description: 'Отримають практичні навички з кібербезпеки, які будуть корисні для навчання та майбутньої кар\'єри.',
    Icon: AcademicCapIcon,
    iconColor: 'text-red-400',
    bgColor: 'bg-red-500/10'
  }
];

export default function ForWhomSection() {
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
            Для кого цей курс?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="h-full"
              >
                <div className="p-8 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl h-full flex flex-col">
                  <div className={`${group.bgColor} p-4 rounded-full w-fit mx-auto mb-6 flex-shrink-0`}>
                    <group.Icon className={`h-12 w-12 ${group.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 flex-shrink-0">{group.title}</h3>
                  <p className="text-gray-400 flex-grow">
                    {group.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}