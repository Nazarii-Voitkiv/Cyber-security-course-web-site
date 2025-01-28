'use client';

import { motion } from 'framer-motion';

export default function IntroSection() {
  return (
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Кібер-ефекти */}
        <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />

        <div className="container mx-auto px-4 relative">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text animate-gradient">
              Захисти себе, свою компанію та свій бізнес в інтернеті
            </h2>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
              Почни навчання з кібербезпеки і отримай практичні навички від експертів вже сьогодні!
            </p>
          </motion.div>

          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto space-y-8"
          >
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
              <p className="text-lg text-cyan-100 mb-6">
                Щодня ти, як і мільйони ризикуєш стати жертвою фішингу або іншого онлайн-шахрайства. Дізнайся, як захистити свої дані, листування та фінанси!
              </p>

              <p className="text-gray-400 mb-8">
                Сьогодні кіберзагрози стали невід&apos;ємною частиною нашого цифрового життя. Шахраї кожного дня вигадують нові способи обману користувачів інтернету. Кожен користувач, кожен роутер, кожен бізнес — усі під загрозою.
              </p>

              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Фішинг</h3>
                    <p className="text-gray-400">
                      У 2023 році понад 80% всіх кібер атак у світі були пов&apos;язані з фішингом, а збитки від фішингових атак щорічно становлять мільярди доларів
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Криптовалютне шахрайство</h3>
                    <p className="text-gray-400">
                      За даними Chainalysis, у 2022 році було вкрадено понад 7 мільярдів доларів у криптовалютах через підроблені сайти та фішингові схеми
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">Соціальна інженерія</h3>
                    <p className="text-gray-400">
                      Більше 35% користувачів інтернету у світі стали жертвами атак через соціальну інженерію, навіть не підозрюючи про це
                    </p>
                  </div>
                </li>
              </ul>

              <motion.div
                  initial={{opacity: 0, x: -100}}
                  whileInView={{opacity: 1, x: 0}}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.8
                  }}
                  viewport={{once: true}} // Додано цей параметр
                  className="mt-8 pt-8 border-t border-gray-700"
              >
                <p className="text-xl font-semibold text-red-400">
                  Ти не можеш ігнорувати ці загрози. Кожен день ти ризикуєш стати жертвою фішингу, втратити гроші,
                  особисті дані та свої секрети.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
  );
}
