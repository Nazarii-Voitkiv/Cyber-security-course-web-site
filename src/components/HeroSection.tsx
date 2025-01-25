'use client';

import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

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
    <section className="relative min-h-[90vh] flex items-center">
      {/* Неонова лінія зверху */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
      
      {/* Основний контент */}
      <div className="container mx-auto px-4">
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
            <ShieldCheckIcon className="h-20 w-20 mx-auto text-cyan-400" />
          </motion.div>

          {/* Заголовок */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Онлайн-курс з кібербезпеки
          </h1>

          {/* Підзаголовок */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Захистіть себе та свій бізнес від шахраїв в інтернеті. 
            Отримайте практичні навички кібербезпеки від експертів.
          </p>

          {/* Банер зі знижкою */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-full text-xl font-bold mb-8 inline-block"
          >
            🔥 Спеціальна пропозиція: Знижка 67% на всі курси! 🔥
          </motion.div>

          {/* Картки курсів */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {courseTypes.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pt-6"
              >
                {course.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                    Рекомендовано
                  </div>
                )}
                <div className={`p-8 rounded-xl backdrop-blur-sm border shadow-xl h-full flex flex-col
                              ${course.recommended 
                                ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/80 border-cyan-500/50' 
                                : 'bg-gradient-to-b from-gray-800/50 to-gray-900/50 border-gray-700'}`}>
                  <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-400 mb-4">{course.description}</p>
                  
                  {/* Блок з ціною та знижкою */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-gray-400 line-through text-lg">{course.originalPrice}</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                        -{course.discount}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-white">{course.price}</div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <div className="h-2 w-2 rounded-full bg-cyan-400 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300
                              ${course.recommended 
                                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400' 
                                : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                  >
                    Почати навчання
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Таймер акції */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-sm"
          >
            ⏰ Пропозиція діє обмежений час
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
