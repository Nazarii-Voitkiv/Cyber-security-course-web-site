'use client';

import { motion } from 'framer-motion';
import { ShieldCheckIcon, LightBulbIcon, BanknotesIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const reasons = [
    {
      title: 'Зрозумій кіберзлочинців',
      description: 'Дізнайся, які загрози існують в інтернеті, чому злочинці постійно їх вдосконалюють та як вони можуть зачепити тебе особисто;',
      Icon: LightBulbIcon,
    },
    {
      title: 'Навчися захищатися',
      description: 'Ти отримаєш теорію та практичні навички, які допоможуть уникнути фішингу, шахрайства з криптовалютою та інших розповсюджених атак;',
      Icon: ShieldCheckIcon,
    },
    {
      title: 'Захистити свої гроші',
      description: 'Ми навчимо, як захистити свої фінанси у банку, банківські картки та криптовалютні гаманці від хакерів;',
      Icon: BanknotesIcon,
    },
    {
      title: 'Не стань черговою жертвою',
      description: 'Ми покажемо тобі реальні приклади шахрайства з минулого та сьогодення, щоб ти навчився розпізнавати загрози з самого їх початку та уникати їх.',
      Icon: ExclamationTriangleIcon,
    },
  ];

export default function WhyThisCourseSection() {
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
            Навіщо тобі цей курс?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <reason.Icon className="h-6 w-6 text-cyan-400 mr-2" />
                <h3 className="text-xl font-semibold">{reason.title}</h3>
              </div>
              <p className="text-gray-400">{reason.description}</p>
            </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}