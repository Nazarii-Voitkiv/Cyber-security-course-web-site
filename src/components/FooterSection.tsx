'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const socialIcons = {
  Instagram: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
    </svg>
  ),
  Telegram: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
};

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

export default function FooterSection() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('/api/footer/get');
        const result = await response.json();
        
        if (result.success) {
          setFooterData(result.data);
        } else {
          setError('Failed to load footer data');
        }
      } catch {
        setError('Failed to load footer data');
      }
    };

    fetchFooterData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center py-20">{error}</div>;
  }

  if (!footerData) {
    return <div className="text-gray-400 text-center py-20">Loading...</div>;
  }

  return (
    <footer className="py-20 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12 md:gap-8"
        >
          <div>
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Контакти
            </h3>
            <div className="space-y-2 text-gray-400">
              <p>Email: {footerData.contacts.email}</p>
              <p>{footerData.contacts.workHours}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Соціальні мережі
            </h3>
            <div className="flex space-x-4">
              {footerData.socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {socialIcons[social.name as keyof typeof socialIcons]}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Документація
            </h3>
            <div className="space-y-2">
              {footerData.docs.map((doc) => (
                <motion.a
                  key={doc.title}
                  href={doc.url}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  {doc.title}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-gray-500 mt-16"
        >
          <p>{footerData.copyright}</p>
        </motion.div>
      </div>
    </footer>
  );
}