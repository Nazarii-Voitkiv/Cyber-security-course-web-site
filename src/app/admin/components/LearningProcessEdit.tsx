'use client';

import { useState, useEffect } from 'react';

interface FeatureItem {
  title: string;
  description: string;
}

interface StepItem {
  number: string;
  title: string;
  description: string;
}

interface LearningProcessData {
  title: string;
  subtitle: string;
  features: FeatureItem[];
  processSteps: StepItem[];
}

export default function LearningProcessEdit() {
  const [data, setData] = useState<LearningProcessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // 1. Завантажуємо дані
  useEffect(() => {
    fetch('/api/learningprocess/get')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 2. Зберігаємо
  const handleSave = async () => {
    if (!data) return;
    setMessage('');
    try {
      const res = await fetch('/api/learningprocess/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const j = await res.json();
      if (j.success) {
        setMessage('LearningProcess збережено успішно!');
      } else {
        setMessage('Помилка збереження LearningProcess');
      }
    } catch (error) {
      console.error(error);
      setMessage('Помилка при збереженні...');
    }
  };

  if (loading) return <div className="text-center py-4 text-cyan-200">Завантаження...</div>;
  if (!data) return <div className="text-gray-400">Не вдалося завантажити learningProcess.json</div>;

  return (
    <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
      <h2 className="text-xl text-cyan-100 font-bold mb-4">Learning Process Section</h2>

      {message && (
        <div className="mb-4 p-2 bg-gray-700 text-green-400 rounded">
          {message}
        </div>
      )}

      <div className="space-y-4">
        <div className="mb-2">
          <label className="block text-cyan-100">Заголовок:</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>

        <div className="mb-2">
          <label className="block text-cyan-100">Підзаголовок:</label>
          <textarea
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          />
        </div>

        <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg">
          <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
            Особливості навчання
          </summary>
          <div className="mt-4 space-y-4">
            {data.features.map((feature, idx) => (
              <div key={idx} className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                <div className="mb-2">
                  <label className="block text-cyan-100">Заголовок:</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    value={feature.title}
                    onChange={(e) => {
                      const updated = [...data.features];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setData({ ...data, features: updated });
                    }}
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-cyan-100">Опис:</label>
                  <textarea
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    value={feature.description}
                    onChange={(e) => {
                      const updated = [...data.features];
                      updated[idx] = { ...updated[idx], description: e.target.value };
                      setData({ ...data, features: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </details>

        <details className="bg-gray-700/20 p-4 border border-gray-600 rounded-lg">
          <summary className="cursor-pointer text-cyan-100 font-semibold mb-2">
            Кроки процесу
          </summary>
          <div className="mt-4 space-y-4">
            {data.processSteps.map((step, idx) => (
              <div key={idx} className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                <div className="mb-2">
                  <label className="block text-cyan-100">Номер:</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    value={step.number}
                    onChange={(e) => {
                      const updated = [...data.processSteps];
                      updated[idx] = { ...updated[idx], number: e.target.value };
                      setData({ ...data, processSteps: updated });
                    }}
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-cyan-100">Заголовок:</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    value={step.title}
                    onChange={(e) => {
                      const updated = [...data.processSteps];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setData({ ...data, processSteps: updated });
                    }}
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-cyan-100">Опис:</label>
                  <textarea
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    value={step.description}
                    onChange={(e) => {
                      const updated = [...data.processSteps];
                      updated[idx] = { ...updated[idx], description: e.target.value };
                      setData({ ...data, processSteps: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </details>

        <button
          onClick={handleSave}
          className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600 transition-colors"
        >
          Зберегти Learning Process
        </button>
      </div>
    </div>
  );
}
