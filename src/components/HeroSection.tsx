'use client';

import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import CountdownTimer from './CountdownTimer';

const courseTypes = [
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

export default function HeroSection() {
  return (
    <section className="relative min-h-screen cyber-background">
      {/* Кібер-елементи */}
      <div className="matrix-grid" />
      <div className="glitch-overlay" />
      
      {/* Основний контент */}
      <div className="container mx-auto px-4 py-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Іконка */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <ShieldCheckIcon className="h-16 w-16 md:h-20 md:w-20 mx-auto text-cyan-400" />
          </motion.div>

          {/* Заголовок */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-gradient">
            Онлайн-курс з кібербезпеки
          </h1>

          {/* Підзаголовок */}
          <p className="text-lg md:text-xl text-cyan-100 mb-8 md:mb-12 max-w-2xl mx-auto">
            Захистіть себе та свій бізнес від шахраїв в інтернеті. 
            Отримайте практичні навички кібербезпеки від експертів.
          </p>

          {/* Банер зі знижкою */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-full text-base md:text-xl font-bold mb-6 md:mb-8 inline-block shadow-lg shadow-red-500/20"
          >
            🔥 Спеціальна пропозиція: Знижка 67% на всі курси! 🔥
          </motion.div>

          {/* Таймер */}
          <div className="mb-8">
            <CountdownTimer />
          </div>

          {/* Картки курсів */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8">
            {courseTypes.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pt-6"
              >
                {course.recommended && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap shadow-lg z-10">
                    Рекомендовано
                  </div>
                )}
                <div className={`cyber-card p-6 md:p-8 rounded-xl h-full flex flex-col neon-border
                              ${course.recommended ? 'border-cyan-500/30' : 'border-gray-700/30'}`}>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm md:text-base">{course.description}</p>
                  
                  {/* Блок з ціною та знижкою */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-gray-400 line-through text-base md:text-lg">{course.originalPrice}</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs md:text-sm font-bold shadow-lg shadow-red-500/20">
                        -{course.discount}
                      </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      {course.price}
                    </div>
                  </div>

                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow text-sm md:text-base">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-cyan-100">
                        <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-cyan-400 mr-2 md:mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`cyber-button w-full py-3 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg`}
                  >
                    Почати навчання
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
