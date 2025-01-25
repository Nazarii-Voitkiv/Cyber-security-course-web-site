'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "Чи потрібні попередні знання для проходження курсу?",
    answer: "Ні, курс розроблений для початківців. Ми починаємо з базових понять і поступово переходимо до складніших тем. Все, що вам потрібно — це комп'ютер або смартфон та бажання вчитися."
  },
  {
    question: "Як проходить навчання?",
    answer: "Навчання відбувається у зручному для вас темпі через Telegram-бот. Ви отримуєте доступ до відеоуроків, практичних завдань та матеріалів. Після кожного модуля є тест для перевірки знань. У повному курсі також доступні особисті консультації з експертом."
  },
  {
    question: "Скільки часу займає проходження курсу?",
    answer: "Ознайомчий курс можна пройти за 2-3 тижні, приділяючи навчанню 2-3 години на тиждень. Повний курс розрахований на 2-3 місяці при такому ж темпі навчання. Але ви можете навчатися у своєму темпі — доступ до матеріалів не обмежений за часом."
  },
  {
    question: "Чи отримаю я сертифікат після завершення?",
    answer: "Так, після успішного завершення курсу ви отримаєте сертифікат. Для ознайомчого курсу — базовий сертифікат, для повного курсу — розширений сертифікат з детальним описом набутих компетенцій."
  },
  {
    question: "Що робити, якщо виникнуть технічні проблеми?",
    answer: "У нас є технічна підтримка, яка працює щодня з 9:00 до 21:00. Ви можете звернутися через Telegram-бот або написати на email. Середній час відповіді — до 2 годин."
  },
  {
    question: "Чи можна оплатити курс частинами?",
    answer: "Так, для повного курсу доступна розстрочка на 3 платежі без переплат. Ознайомчий курс можна оплатити тільки повною вартістю через його невисоку ціну."
  },
  {
    question: "Як довго я матиму доступ до матеріалів?",
    answer: "В ознайомчому курсі доступ до матеріалів зберігається протягом 3 місяців після покупки. У повному курсі ви отримуєте довічний доступ до всіх матеріалів, включаючи майбутні оновлення."
  },
  {
    question: "Чи можна перейти з ознайомчого на повний курс?",
    answer: "Так, ви можете оновити свій курс до повного в будь-який момент. Вартість ознайомчого курсу буде врахована, тому ви заплатите тільки різницю."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            Часті запитання
          </h2>
          <p className="text-xl text-gray-400">
            Відповіді на популярні запитання про наш курс
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left"
              >
                <div className="p-6 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl 
                              transition-all duration-300 hover:border-cyan-500/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white pr-8">
                      {faq.question}
                    </h3>
                    <ChevronDownIcon 
                      className={`h-6 w-6 text-cyan-400 transition-transform duration-300 flex-shrink-0
                                ${openIndex === index ? 'rotate-180' : ''}`}
                    />
                  </div>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-gray-400 border-t border-gray-700 pt-4">
                          {faq.answer}
                        </p>
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
