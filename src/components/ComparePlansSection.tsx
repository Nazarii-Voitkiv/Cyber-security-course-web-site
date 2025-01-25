'use client';

import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Базові матеріали курсу',
    basic: true,
    full: true,
  },
  {
    name: 'Практичні завдання',
    basic: 'Базові',
    full: 'Розширені',
  },
  {
    name: 'Тривалість доступу',
    basic: '3 місяці',
    full: 'Довічний',
  },
  {
    name: 'Підтримка в чаті',
    basic: true,
    full: true,
  },
  {
    name: 'Особисті консультації',
    basic: false,
    full: true,
  },
  {
    name: 'Сертифікат про завершення',
    basic: 'Базовий',
    full: 'Розширений',
  },
  {
    name: 'Доступ до закритої спільноти',
    basic: false,
    full: true,
  },
  {
    name: 'Оновлення матеріалів',
    basic: '3 місяці',
    full: 'Постійно',
  },
  {
    name: 'Додаткові матеріали',
    basic: false,
    full: true,
  },
];

const plans = [
  {
    title: 'Ознайомчий курс',
    description: 'Базові знання з кібербезпеки для початківців',
    originalPrice: '1499 ₴',
    price: '499 ₴',
    discount: '67%',
    features: [
      'Доступ до основних матеріалів',
      'Базові практичні завдання',
      'Підтримка в чаті',
      '3 місяці доступу'
    ]
  },
  {
    title: 'Повний курс',
    description: 'Поглиблене вивчення кібербезпеки',
    originalPrice: '7499 ₴',
    price: '2499 ₴',
    discount: '67%',
    features: [
      'Повний доступ до всіх матеріалів',
      'Розширені практичні завдання',
      'Особисті консультації',
      'Довічний доступ'
    ],
    recommended: true
  }
];

export default function ComparePlansSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Кібер-елементи */}
      <div className="matrix-grid" />
      <div className="glitch-overlay" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            Виберіть свій курс
          </motion.h2>
          
          {/* Банер зі знижкою */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-full text-base md:text-xl font-bold mb-6 inline-block shadow-lg shadow-red-500/20"
          >
            🔥 Спеціальна пропозиція: Знижка 67% на всі курси! 🔥
          </motion.div>

          {/* Таймер */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <CountdownTimer />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap shadow-lg z-10">
                  Рекомендовано
                </div>
              )}
              <div className={`cyber-card p-6 md:p-8 rounded-xl h-full flex flex-col neon-border
                            ${plan.recommended ? 'border-cyan-500/30' : 'border-gray-700/30'}`}>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{plan.title}</h3>
                <p className="text-gray-400 mb-4 text-sm md:text-base">{plan.description}</p>
                
                {/* Блок з ціною та знижкою */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-gray-400 line-through text-base md:text-lg">{plan.originalPrice}</span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs md:text-sm font-bold shadow-lg shadow-red-500/20">
                      -{plan.discount}
                    </span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    {plan.price}
                  </div>
                </div>

                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow text-sm md:text-base">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-cyan-100">
                      <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-cyan-400 mr-2 md:mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cyber-button w-full py-3 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg"
                >
                  Почати навчання
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Таблиця порівняння */}
        <div className="border border-gray-700 rounded-xl overflow-hidden mt-12">
          {features.map((feature, index) => (
            <div 
              key={feature.name}
              className={`grid grid-cols-3 gap-4 md:gap-8 ${
                index % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-900/50'
              }`}
            >
              <div className="col-span-1 p-4 border-r border-gray-700">
                <span className="text-gray-300 text-sm md:text-base">{feature.name}</span>
              </div>
              <div className="col-span-1 p-4 text-center border-r border-gray-700">
                {typeof feature.basic === 'boolean' ? (
                  feature.basic ? (
                    <CheckIcon className="h-5 w-5 md:h-6 md:w-6 text-green-400 mx-auto" />
                  ) : (
                    <XMarkIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-500 mx-auto" />
                  )
                ) : (
                  <span className="text-gray-300 text-sm md:text-base">{feature.basic}</span>
                )}
              </div>
              <div className="col-span-1 p-4 text-center">
                {typeof feature.full === 'boolean' ? (
                  feature.full ? (
                    <CheckIcon className="h-5 w-5 md:h-6 md:w-6 text-green-400 mx-auto" />
                  ) : (
                    <XMarkIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-500 mx-auto" />
                  )
                ) : (
                  <span className="text-gray-300 text-sm md:text-base">{feature.full}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Додаткова інформація */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-gray-400 text-sm text-center mt-8"
        >
          * Після оплати ви отримаєте доступ через Telegram-бот протягом 5 хвилин
        </motion.p>
      </div>
    </section>
  );
}
