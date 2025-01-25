'use client';

import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  AcademicCapIcon, 
  ChatBubbleBottomCenterTextIcon, 
  DocumentCheckIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const benefits = [
  {
    title: 'Захист від шахраїв',
    description: 'Навчитеся розпізнавати фішингові атаки, шахрайські схеми та захищати свої фінансові дані.',
    Icon: ShieldCheckIcon,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10'
  },
  {
    title: 'Практичні навички',
    description: 'Отримаєте реальні інструменти та техніки для захисту своїх пристроїв та даних.',
    Icon: AcademicCapIcon,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Особисті консультації',
    description: 'Зможете отримати відповіді на свої питання від експертів з кібербезпеки.',
    Icon: ChatBubbleBottomCenterTextIcon,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10'
  },
  {
    title: 'Сертифікат',
    description: 'Отримаєте документ, що підтверджує ваші знання з кібербезпеки.',
    Icon: DocumentCheckIcon,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  },
  {
    title: 'Довічний доступ',
    description: 'Матимете постійний доступ до матеріалів курсу та всіх майбутніх оновлень.',
    Icon: ClockIcon,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10'
  },
  {
    title: 'Спільнота',
    description: 'Приєднаєтесь до спільноти однодумців, де зможете обмінюватися досвідом.',
    Icon: UserGroupIcon,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10'
  }
];

export default function BenefitsSection() {
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
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="p-8 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl 
                             transition-transform duration-300 group-hover:scale-[1.02] h-full flex flex-col">
                <div className={`${benefit.bgColor} p-4 rounded-full w-fit mb-6 
                                transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
                  <benefit.Icon className={`h-8 w-8 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white flex-shrink-0">{benefit.title}</h3>
                <p className="text-gray-400 flex-grow">{benefit.description}</p>
              </div>
              
              {/* Subtle glow effect on hover */}
              <div className={`absolute -inset-0.5 ${benefit.bgColor} opacity-0 group-hover:opacity-20 
                              rounded-xl blur transition duration-300`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
