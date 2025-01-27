import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                // Правило для всіх маршрутів
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        // Дозволяємо завантажувати:
                        // - 'self'  (той самий домен)
                        // - inline-скрипти (небажано у продакшні, але для пікселя зазвичай потрібно)
                        // - завантаження зі https://connect.facebook.net
                        value:
                            "default-src 'self'; " +
                            "script-src 'self' 'unsafe-inline' https://connect.facebook.net; " +
                            "connect-src 'self' https://connect.facebook.net; " +
                            "img-src 'self' https://www.facebook.com; " +
                            "style-src 'self' 'unsafe-inline'; " +
                            "frame-ancestors 'self';",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
