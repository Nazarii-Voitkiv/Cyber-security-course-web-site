'use client';

import { motion } from 'framer-motion';
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

export default function ComparePlansSection() {
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
            Виберіть свій курс
          </h2>
          <p className="text-xl text-gray-400">
            Порівняйте можливості та оберіть курс, який підходить саме вам
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Заголовки колонок для десктопу */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8 text-center">
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <div className="relative pt-6">
                <h3 className="text-xl font-semibold mb-2">Ознайомчий курс</h3>
                <div className="text-3xl font-bold text-white mb-4">499 ₴</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 px-6 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition-all duration-300"
                >
                  Обрати ознайомчий курс
                </motion.button>
              </div>
            </div>
            <div className="col-span-1">
              <div className="relative pt-6">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Рекомендовано
                </div>
                <h3 className="text-xl font-semibold mb-2">Повний курс</h3>
                <div className="text-3xl font-bold text-white mb-4">2499 ₴</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-full font-semibold hover:shadow-green-500/25 transition-all duration-300"
                >
                  Обрати повний курс
                </motion.button>
              </div>
            </div>
          </div>

          {/* Мобільна версія карток */}
          <div className="md:hidden space-y-6 mb-8">
            {/* Ознайомчий курс */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl">
              <h3 className="text-xl font-semibold mb-2">Ознайомчий курс</h3>
              <div className="text-3xl font-bold text-white mb-4">499 ₴</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-6 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition-all duration-300"
              >
                Обрати ознайомчий курс
              </motion.button>
            </div>

            {/* Повний курс */}
            <div className="relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap z-10">
                Рекомендовано
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-cyan-500/50 shadow-xl">
                <h3 className="text-xl font-semibold mb-2">Повний курс</h3>
                <div className="text-3xl font-bold text-white mb-4">2499 ₴</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-full font-semibold hover:shadow-green-500/25 transition-all duration-300"
                >
                  Обрати повний курс
                </motion.button>
              </div>
            </div>
          </div>

          {/* Таблиця порівняння */}
          <div className="border border-gray-700 rounded-xl overflow-hidden">
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
      </motion.div>
    </section>
  );
}
