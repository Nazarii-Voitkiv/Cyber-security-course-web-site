import { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import ConditionalNavbar from '@/components/ConditionalNavbar';

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://cyber-security-course-web-site.vercel.app';

// Метадані
export const metadata: Metadata = {
  title: 'Cyber Security Course – Курс з кібербезпеки',
  description: 'Комплексний курс з кібербезпеки: навчіться захищати свої дані, пристрої та системи від загроз в інтернеті.',
  keywords: [
    'кібербезпека',
    'cyber security',
    'курси з кібербезпеки',
    'захист даних',
    'безпека в інтернеті',
    'онлайн-навчання',
    'інформаційна безпека',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Cyber Security Course – Курс з кібербезпеки',
    description: 'Отримайте практичні навички з кібербезпеки та захистіть свої дані.',
    url: domain, 
    siteName: 'Cyber Security Course',
    locale: 'uk_UA',
    type: 'website',
    images: [
      {
        url: `${domain}/og-image.jpg`, 
        width: 1200,
        height: 630,
        alt: 'Зображення для курсу з кібербезпеки',
      },
    ],
  }
};

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'New Cyber Security Course',
  description:
    'Оновлений комплексний курс з кібербезпеки для всіх, хто прагне навчитися захисту від кібератак та зламів.', // змінено description
  provider: {
    '@type': 'Organization',
    name: 'Cyber Security Course',
    sameAs: domain, 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> {/* змінено на svg */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" sizes="180x180" />
        <link rel="canonical" href={domain} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      </head>
      <body>
        <Providers>
          <ConditionalNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}