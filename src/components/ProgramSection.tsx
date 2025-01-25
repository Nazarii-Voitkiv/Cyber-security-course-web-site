'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const modules = [
  {
    id: 1,
    title: 'Основи кібербезпеки',
    description: 'Базові принципи безпеки в інтернеті',
    topics: [
      'Що таке кібербезпека та чому вона важлива',
      'Типи кіберзагроз та як їх розпізнати',
      'Створення надійних паролів та їх зберігання',
      'Двофакторна автентифікація та її налаштування'
    ]
  },
  {
    id: 2,
    title: 'Безпека в соціальних мережах',
    description: 'Захист особистих даних та приватності',
    topics: [
      'Налаштування приватності в соцмережах',
      'Розпізнавання фішингових атак',
      'Безпечне спілкування в месенджерах',
      'Захист від соціальної інженерії'
    ]
  },
  {
    id: 3,
    title: 'Фінансова безпека онлайн',
    description: 'Захист від шахрайства та крадіжок',
    topics: [
      'Безпечні онлайн-платежі',
      'Захист банківських карток',
      'Розпізнавання шахрайських схем',
      'Безпечні покупки в інтернеті'
    ]
  },
  {
    id: 4,
    title: 'Захист пристроїв',
    description: 'Безпека комп’ютерів та смартфонів',
    topics: [
      'Антивірусний захист',
      'Налаштування брандмауера',
      'Безпечне використання Wi-Fi',
      'Резервне копіювання даних'
    ]
  },
  {
    id: 5,
    title: 'Безпека дітей в інтернеті',
    description: 'Контроль та захист дітей онлайн',
    topics: [
      'Батьківський контроль',
      'Безпечний контент для дітей',
      'Обмеження доступу до небажаних сайтів',
      'Спілкування з дітьми про онлайн-безпеку'
    ]
  }
];

export default function ProgramSection() {
  const [openModule, setOpenModule] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-800/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Програма курсу
          </h2>
          <p className="text-xl text-gray-400">
            П'ять модулів, які зроблять ваше життя в інтернеті безпечнішим
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {modules.map((module) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setOpenModule(openModule === module.id ? null : module.id)}
                className="w-full text-left"
              >
                <div className="p-6 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl 
                              transition-all duration-300 hover:border-cyan-500/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Модуль {module.id}: {module.title}
                      </h3>
                      <p className="text-gray-400 mt-1">{module.description.replace("'", "&apos;")}</p>
                    </div>
                    <ChevronDownIcon 
                      className={`h-6 w-6 text-cyan-400 transition-transform duration-300 
                                ${openModule === module.id ? 'rotate-180' : ''}`}
                    />
                  </div>

                  <AnimatePresence>
                    {openModule === module.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-2 border-t border-gray-700 pt-4">
                          {module.topics.map((topic, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center text-gray-300"
                            >
                              <div className="h-2 w-2 rounded-full bg-cyan-400 mr-3" />
                              {topic}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
