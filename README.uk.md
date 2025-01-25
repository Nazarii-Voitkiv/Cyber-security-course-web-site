# Веб-сайт курсу з кібербезпеки

Сучасний веб-сайт для курсу з кібербезпеки, розроблений з використанням Next.js та сучасних веб-технологій.

## Особливості

- Сучасний дизайн з кібер-тематикою
- Захищена адмін-панель
- Адаптивний дизайн
- Інтеграція з Facebook Pixel
- Таймер зворотного відліку
- Анімації з використанням Framer Motion

## Технології

- **Frontend:**
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Framer Motion

- **Безпека:**
  - NextAuth.js
  - HTTP Security Headers
  - Rate Limiting
  - CSRF Protection
  - XSS Protection
  - Secure Password Hashing

## Передумови

- Node.js 18.0.0 або новіше
- npm 9.0.0 або новіше

## Встановлення

1. **Клонування репозиторію:**
   ```bash
   git clone https://github.com/your-username/cyber-security-course-web-site.git
   cd cyber-security-course-web-site
   ```

2. **Встановлення залежностей:**
   ```bash
   npm install
   ```

3. **Налаштування змінних середовища:**
   Створіть файл `.env.local` з наступними змінними:
   ```env
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_secure_password
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXT_PUBLIC_FB_PIXEL_ID=your_fb_pixel_id
   NODE_ENV=production
   ```

## Розробка

Запуск в режимі розробки:
```bash
npm run dev
```

## Збірка

Створення production збірки:
```bash
npm run build
```

Запуск production версії:
```bash
npm start
```

## Безпека

Проект включає наступні заходи безпеки:

- **Автентифікація:**
  - Захист від брутфорс атак
  - Хешування паролів
  - Обмежений час сесії

- **Захист від атак:**
  - Rate limiting
  - CSRF захист
  - XSS захист через CSP
  - Secure Headers

- **Валідація даних:**
  - Zod схеми
  - Санітизація вводу
  - Типізація TypeScript

## Структура проекту

```
src/
├── app/                 # Next.js app router
├── components/         # React компоненти
├── lib/               # Утиліти та хелпери
├── styles/           # Глобальні стилі
└── types/            # TypeScript типи
```

## Адмін панель

Доступ до адмін панелі:
1. Перейдіть на `/admin/login`
2. Введіть облікові дані адміністратора
3. Керуйте контентом сайту

## Аналітика

Проект інтегрований з Facebook Pixel для відстеження конверсій та аналітики.

## Внесок

1. Fork репозиторію
2. Створіть гілку для функціоналу (`git checkout -b feature/amazing-feature`)
3. Commit зміни (`git commit -m 'Add amazing feature'`)
4. Push у гілку (`git push origin feature/amazing-feature`)
5. Відкрийте Pull Request

## Ліцензія

Цей проект є пропрієтарним програмним забезпеченням. Всі права захищені.
- Несанкціоноване копіювання будь-яких файлів цього проекту, будь-яким способом, суворо заборонено
- Вміст та код є конфіденційними і можуть використовуватися лише з явного дозволу власника проекту
- Розроблено [Назва Вашої Компанії] для [Назва Клієнта], 2025

## Контакти

Ваше ім'я - [@your-twitter](https://twitter.com/your-twitter) - email@example.com

Project Link: [https://github.com/your-username/cyber-security-course-web-site](https://github.com/your-username/cyber-security-course-web-site)
