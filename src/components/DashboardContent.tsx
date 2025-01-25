'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

interface ContentSection {
  id: string;
  title: string;
  content: string;
}

export default function DashboardContent() {
  const [sections, setSections] = useState<ContentSection[]>([
    {
      id: 'hero',
      title: 'Головний екран',
      content: JSON.stringify({
        title: 'Онлайн-курс з кібербезпеки',
        subtitle: 'Захистіть себе та свій бізнес від шахраїв в інтернеті. Отримайте практичні навички кібербезпеки від експертів.',
        courses: [
          {
            title: 'Ознайомчий курс',
            description: 'Базові знання з кібербезпеки для початківців',
            price: '499 ₴',
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
            price: '2499 ₴',
            features: [
              'Повний доступ до всіх матеріалів',
              'Розширені практичні завдання',
              'Особисті консультації',
              'Довічний доступ'
            ]
          }
        ]
      }, null, 2)
    },
    // Add more sections as needed
  ]);

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [pixelId, setPixelId] = useState('');

  const handleContentChange = (sectionId: string, newContent: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, content: newContent }
        : section
    ));
  };

  const handleSave = async () => {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sections, pixelId }),
      });
      // Show success message
    } catch {
      // Show error message
    }
  };

  const handlePixelIdSave = async () => {
    try {
      await fetch('/api/pixel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pixelId }),
      });
      // Show success message
    } catch {
      // Show error message
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Панель адміністратора</h1>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Вийти
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-bold text-white mb-4">Розділи</h2>
            <nav className="space-y-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeSection === section.id
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8 bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-bold text-white mb-4">Facebook Pixel</h2>
            <input
              type="text"
              value={pixelId}
              onChange={(e) => setPixelId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              placeholder="Введіть ID пікселя"
            />
            <button
              onClick={handlePixelIdSave}
              className="mt-2 w-full px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-600"
            >
              Зберегти ID пікселя
            </button>
          </div>
        </div>

        {/* Content Editor */}
        <div className="md:col-span-3">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              {sections.find(s => s.id === activeSection)?.title}
            </h2>
            
            <textarea
              value={sections.find(s => s.id === activeSection)?.content || ''}
              onChange={(e) => handleContentChange(activeSection, e.target.value)}
              className="w-full h-[600px] px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white font-mono"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="mt-4 px-6 py-3 bg-cyan-500 text-black rounded-lg hover:bg-cyan-600 font-semibold"
            >
              Зберегти зміни
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
