'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminPageData } from '@/contexts/AdminPageDataContext';
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

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

export default function FooterEdit() {
    const { pageData, loading, refreshData } = useAdminPageData();
    const [data, setData] = useState<FooterData | null>(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isSaving, setIsSaving] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        if (pageData.footer && !data) {
            setData(pageData.footer as FooterData);
        }
    }, [pageData, data]);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const handleContactUpdate = (field: keyof FooterData['contacts'], value: string) => {
        if (!data) return;
        
        const updatedContacts = { ...data.contacts, [field]: value };
        setData({ ...data, contacts: updatedContacts });
    };

    const handleSocialLinkUpdate = (idx: number, field: keyof FooterData['socialLinks'][0], value: string) => {
        if (!data) return;
        
        const updatedSocialLinks = [...data.socialLinks];
        updatedSocialLinks[idx] = { ...updatedSocialLinks[idx], [field]: value };
        
        setData({ ...data, socialLinks: updatedSocialLinks });
    };

    const addSocialLink = () => {
        if (!data) return;
        
        const newSocialLink = {
            name: 'Instagram',
            url: 'https://instagram.com/'
        };
        
        setData({
            ...data,
            socialLinks: [...data.socialLinks, newSocialLink]
        });
    };

    const removeSocialLink = (idx: number) => {
        if (!data) return;
        
        const updatedSocialLinks = data.socialLinks.filter((_, i) => i !== idx);
        setData({ ...data, socialLinks: updatedSocialLinks });
    };

    const handleDocUpdate = (idx: number, field: keyof FooterData['docs'][0], value: string) => {
        if (!data) return;
        
        const updatedDocs = [...data.docs];
        updatedDocs[idx] = { ...updatedDocs[idx], [field]: value };
        
        setData({ ...data, docs: updatedDocs });
    };

    const addDoc = () => {
        if (!data) return;
        
        const newDoc = {
            title: 'Нова документація',
            url: 'https://example.com/doc'
        };
        
        setData({
            ...data,
            docs: [...data.docs, newDoc]
        });
    };

    const removeDoc = (idx: number) => {
        if (!data) return;
        
        const updatedDocs = data.docs.filter((_, i) => i !== idx);
        setData({ ...data, docs: updatedDocs });
    };

    const save = async () => {
        if (!data) return;
        setMessage('');
        setIsSaving(true);
        setStatus('idle');

        try {
            const response = await fetch('/api/direct-update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section: 'footer', data })
            });

            const result = await response.json();
            
            setStatus(result.success ? 'success' : 'error');
            setMessage(result.success 
                ? 'Секцію &quot;Footer&quot; оновлено успішно!' 
                : `Помилка: ${result.error || 'Невідома помилка'}`
            );
            
            if (result.success) refreshData();
        } catch (error: unknown) {
            setStatus('error');
            const errorMessage = error instanceof Error ? error.message : 'Невідома помилка';
            setMessage(`Виникла помилка: ${errorMessage}`);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !data) {
        return (
            <div className="mb-8 bg-gray-800/70 p-6 rounded-xl shadow-lg border border-gray-700">
                <div className="animate-pulse space-y-4">
                    <div className="h-7 bg-gray-700/70 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-700/70 rounded w-full"></div>
                    <div className="h-4 bg-gray-700/70 rounded w-5/6"></div>
                    <div className="h-10 bg-gray-700/70 rounded-lg w-full"></div>
                </div>
            </div>
        );
    }

    const inputClasses = "w-full p-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200";
    const labelClasses = "block text-cyan-100 mb-1 font-medium";
    const panelClasses = "mb-5 bg-gray-700/30 p-5 rounded-xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-200";
    const sectionHeaderClasses = "flex items-center justify-between cursor-pointer p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/80 transition-all duration-200";
    
    return (
        <div className="mb-8 bg-gray-800/70 p-6 rounded-xl shadow-lg border border-gray-700/70 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-cyan-300 font-bold">Секція &quot;Footer&quot;</h2>
                <div className="text-xs text-gray-400">ID: footer</div>
            </div>

            {message && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-lg ${
                        status === 'success' ? 'bg-green-900/40 text-green-400 border border-green-500/40' : 
                        status === 'error' ? 'bg-red-900/40 text-red-400 border border-red-500/40' : 
                        'bg-gray-700/40 text-gray-300'
                    }`}
                >
                    {message}
                </motion.div>
            )}

            <div className="space-y-6">
                <div className={panelClasses}>
                    <div className={`${labelClasses} text-lg mb-4`}>Контактна інформація</div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className={labelClasses}>Email:</label>
                            <input
                                type="email"
                                className={inputClasses}
                                value={data.contacts.email}
                                onChange={(e) => handleContactUpdate('email', e.target.value)}
                                placeholder="Контактний email"
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Робочі години:</label>
                            <input
                                type="text"
                                className={inputClasses}
                                value={data.contacts.workHours}
                                onChange={(e) => handleContactUpdate('workHours', e.target.value)}
                                placeholder="Робочі години"
                            />
                        </div>
                    </div>
                </div>

                <div className={panelClasses}>
                    <div 
                        className={sectionHeaderClasses}
                        onClick={() => toggleSection('socialLinks')}
                    >
                        <div className="text-lg text-cyan-100 font-medium">Соціальні мережі</div>
                        <div className="flex items-center">
                            <div className="mr-3 text-sm text-gray-400">
                                {data.socialLinks.length} {data.socialLinks.length === 1 ? 'посилання' : data.socialLinks.length < 5 ? 'посилання' : 'посилань'}
                            </div>
                            {activeSection === 'socialLinks' ? (
                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                            )}
                        </div>
                    </div>

                    {activeSection === 'socialLinks' && (
                        <div className="mt-4 space-y-4">
                            <div className="flex justify-end">
                                <motion.button
                                    onClick={addSocialLink}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 bg-cyan-600/60 hover:bg-cyan-600/80 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Додати соцмережу</span>
                                </motion.button>
                            </div>

                            {data.socialLinks.map((link, idx) => (
                                <div key={idx} className="bg-gray-800/70 rounded-xl border border-gray-700/70 p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-cyan-100 font-medium">Соцмережа {idx + 1}</div>
                                        <motion.button
                                            onClick={() => removeSocialLink(idx)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 rounded transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </motion.button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClasses}>Назва:</label>
                                            <select
                                                className={inputClasses}
                                                value={link.name}
                                                onChange={(e) => handleSocialLinkUpdate(idx, 'name', e.target.value)}
                                            >
                                                <option value="Instagram">Instagram</option>
                                                <option value="Telegram">Telegram</option>
                                                <option value="Facebook">Facebook</option>
                                                <option value="Twitter">Twitter</option>
                                                <option value="LinkedIn">LinkedIn</option>
                                                <option value="YouTube">YouTube</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClasses}>URL:</label>
                                            <input
                                                type="url"
                                                className={inputClasses}
                                                value={link.url}
                                                onChange={(e) => handleSocialLinkUpdate(idx, 'url', e.target.value)}
                                                placeholder="https://example.com/"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={panelClasses}>
                    <div 
                        className={sectionHeaderClasses}
                        onClick={() => toggleSection('docs')}
                    >
                        <div className="text-lg text-cyan-100 font-medium">Документація</div>
                        <div className="flex items-center">
                            <div className="mr-3 text-sm text-gray-400">
                                {data.docs.length} {data.docs.length === 1 ? 'документ' : data.docs.length < 5 ? 'документи' : 'документів'}
                            </div>
                            {activeSection === 'docs' ? (
                                <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                            )}
                        </div>
                    </div>

                    {activeSection === 'docs' && (
                        <div className="mt-4 space-y-4">
                            <div className="flex justify-end">
                                <motion.button
                                    onClick={addDoc}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 bg-cyan-600/60 hover:bg-cyan-600/80 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Додати документ</span>
                                </motion.button>
                            </div>

                            {data.docs.map((doc, idx) => (
                                <div key={idx} className="bg-gray-800/70 rounded-xl border border-gray-700/70 p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-cyan-100 font-medium">Документ {idx + 1}</div>
                                        <motion.button
                                            onClick={() => removeDoc(idx)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 rounded transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </motion.button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClasses}>Назва:</label>
                                            <input
                                                type="text"
                                                className={inputClasses}
                                                value={doc.title}
                                                onChange={(e) => handleDocUpdate(idx, 'title', e.target.value)}
                                                placeholder="Назва документа"
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>URL:</label>
                                            <input
                                                type="url"
                                                className={inputClasses}
                                                value={doc.url}
                                                onChange={(e) => handleDocUpdate(idx, 'url', e.target.value)}
                                                placeholder="https://example.com/doc"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={panelClasses}>
                    <div className={`${labelClasses} text-lg mb-4`}>Копірайт</div>
                    <input
                        type="text"
                        className={inputClasses}
                        value={data.copyright}
                        onChange={(e) => setData({ ...data, copyright: e.target.value })}
                        placeholder="Текст копірайту"
                    />
                </div>

                <motion.button
                    onClick={save}
                    disabled={isSaving}
                    whileHover={!isSaving ? { scale: 1.01 } : {}}
                    whileTap={!isSaving ? { scale: 0.99 } : {}}
                    className={`w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold text-lg shadow-lg shadow-blue-900/20 ${
                        isSaving ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {isSaving ? 'Збереження...' : 'Зберегти зміни'}
                </motion.button>
            </div>
        </div>
    );
}