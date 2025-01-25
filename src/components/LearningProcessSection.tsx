'use client';

import { motion } from 'framer-motion';
import { RocketLaunchIcon, ClockIcon, DevicePhoneMobileIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: DevicePhoneMobileIcon,
    title: 'Навчання в Telegram',
    description: 'Весь курс проходить у зручному Telegram-боті. Навчайтеся в будь-який час та в будь-якому місці з вашого смартфона.'
  },
  {
    icon: ClockIcon,
    title: '1 День = 1 Модуль',
    description: 'Кожного дня ви отримуєте новий модуль навчання. Це допомагає засвоювати матеріал поступово та ефективно.'
  },
  {
    icon: AcademicCapIcon,
    title: 'Практичні Завдання',
    description: 'Кожен модуль містить практичні завдання, які допоможуть закріпити отримані знання на практиці.'
  },
  {
    icon: RocketLaunchIcon,
    title: 'Миттєвий Доступ',
    description: 'Одразу після оплати ви отримаєте доступ до Telegram-боту та зможете розпочати навчання.'
  }
];

const processSteps = [
  {
    number: '01',
    title: 'Оплата курсу',
    description: 'Оберіть підходящий тариф та здійсніть оплату через захищену платіжну систему.'
  },
  {
    number: '02',
    title: 'Доступ до боту',
    description: 'Протягом 5 хвилин ви отримаєте посилання на Telegram-бот та інструкції для початку навчання.'
  },
  {
    number: '03',
    title: 'Щоденні модулі',
    description: 'Кожного дня бот надсилатиме вам новий навчальний модуль з теорією та практичними завданнями.'
  },
  {
    number: '04',
    title: 'Підтримка',
    description: 'На всьому шляху навчання ви матимете доступ до підтримки через чат у Telegram.'
  }
];

export default function LearningProcessSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Кібер-елементи */}
      <div className="matrix-grid" />
      <div className="glitch-overlay" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Як проходить навчання
          </h2>
          <p className="text-lg text-cyan-100 max-w-2xl mx-auto">
            Наш курс розроблений так, щоб ви могли ефективно навчатися, не відриваючись від повсякденних справ
          </p>
        </motion.div>

        {/* Основні особливості */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="cyber-card p-6 rounded-xl border border-cyan-500/30"
            >
              <feature.icon className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-cyan-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Процес навчання */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="cyber-card p-6 rounded-xl border border-cyan-500/30 h-full">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-cyan-100">{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-cyan-500/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
