'use client';

import { useState, useEffect } from 'react';

interface FooterData {
    contacts: {
        email: string;
        workHours: string;
    };
    socialLinks: {
        name: string;
        url: string;
    }[];
    docs: {
        title: string;
        url: string;
    }[];
    copyright: string;
}

const defaultData: FooterData = {
    contacts: {
        email: '',
        workHours: ''
    },
    socialLinks: [],
    docs: [],
    copyright: ''
};

export default function FooterEdit() {
    const [data, setData] = useState<FooterData>(defaultData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch('/api/footer/get')
            .then((r) => r.json())
            .then((json) => {
                if (json.success && json.data) {
                    setData(json.data);
                } else {
                    setError('Не вдалося завантажити дані');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error loading footer data:', err);
                setError('Помилка при завантаженні даних');
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setMessage('');
        try {
            const res = await fetch('/api/footer/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (json.success) {
                setMessage('Футер збережено успішно!');
            } else {
                setMessage('Помилка збереження футера');
            }
        } catch (error) {
            console.error(error);
            setMessage('Помилка при збереженні...');
        }
    };

    if (loading) return null;
    if (error) return <div className="text-center py-4 text-red-400">{error}</div>;
    if (!data) return <div className="text-gray-400">Не вдалося завантажити дані</div>;

    return (
        <div className="mb-12 bg-gray-800/50 p-6 rounded-xl">
            <h2 className="text-xl text-cyan-100 font-bold mb-4">Footer Section</h2>

            {message && (
                <div className="mb-4 p-2 bg-gray-700 text-green-400 rounded">
                    {message}
                </div>
            )}

            <details open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
                <summary className="cursor-pointer text-lg text-cyan-100 mb-4 hover:text-cyan-200">
                    Редагування футера {isOpen ? '▼' : '▶'}
                </summary>

                <div className="space-y-6">
                    <div className="p-4 bg-gray-700/50 rounded-lg">
                        <h3 className="text-lg text-cyan-100 mb-4">Контактна інформація</h3>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-cyan-100">Email:</label>
                                <input
                                    type="email"
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    value={data.contacts.email}
                                    onChange={(e) => setData({
                                        ...data,
                                        contacts: { ...data.contacts, email: e.target.value }
                                    })}
                                />
                            </div>
                            <div>
                                <label className="block text-cyan-100">Години роботи:</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    value={data.contacts.workHours}
                                    onChange={(e) => setData({
                                        ...data,
                                        contacts: { ...data.contacts, workHours: e.target.value }
                                    })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-700/50 rounded-lg">
                        <h3 className="text-lg text-cyan-100 mb-4">Соціальні мережі</h3>
                        <div className="space-y-4">
                            {data.socialLinks.map((link, index) => (
                                <div key={index} className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-cyan-100">Назва:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={link.name}
                                            onChange={(e) => {
                                                const updated = [...data.socialLinks];
                                                updated[index] = { ...link, name: e.target.value };
                                                setData({ ...data, socialLinks: updated });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-cyan-100">URL:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={link.url}
                                            onChange={(e) => {
                                                const updated = [...data.socialLinks];
                                                updated[index] = { ...link, url: e.target.value };
                                                setData({ ...data, socialLinks: updated });
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-gray-700/50 rounded-lg">
                        <h3 className="text-lg text-cyan-100 mb-4">Документи</h3>
                        <div className="space-y-4">
                            {data.docs.map((doc, index) => (
                                <div key={index} className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-cyan-100">Назва:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={doc.title}
                                            onChange={(e) => {
                                                const updated = [...data.docs];
                                                updated[index] = { ...doc, title: e.target.value };
                                                setData({ ...data, docs: updated });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-cyan-100">URL:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            value={doc.url}
                                            onChange={(e) => {
                                                const updated = [...data.docs];
                                                updated[index] = { ...doc, url: e.target.value };
                                                setData({ ...data, docs: updated });
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-gray-700/50 rounded-lg">
                        <h3 className="text-lg text-cyan-100 mb-4">Copyright</h3>
                        <div>
                            <input
                                type="text"
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                value={data.copyright}
                                onChange={(e) => setData({
                                    ...data,
                                    copyright: e.target.value
                                })}
                            />
                        </div>
                    </div>
                </div>
            </details>

            <div className="mt-6">
                <button
                    onClick={handleSave}
                    className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                >
                    Зберегти зміни
                </button>
            </div>
        </div>
    );
}
