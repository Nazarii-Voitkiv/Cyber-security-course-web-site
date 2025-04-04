import { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import ConditionalNavbar from '@/components/ConditionalNavbar';
import { Analytics } from "@vercel/analytics/react"

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://cyber-security-course-web-site.vercel.app';

// Метадані
export const metadata: Metadata = {
  title: 'Онлайн-школа SkillForge', // змінено title
  description: 'Навчись захищати себе, свої кошти та свої дані в інтернеті', // змінено description
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
    title: 'Онлайн-школа SkillForge', // змінено openGraph.title
    description: 'Онлайн-курс з кібербезпеки та цифрової гігієни', // змінено openGraph.description
    url: domain, 
    siteName: 'SkillForge',
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
  name: 'SkillForge',
  description:
    'Онлайн-курс з кібербезпеки та цифрової гігієни.', // змінено description
  provider: {
    '@type': 'Organization',
    name: 'SkillForge',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" sizes="180x180" />
        <link rel="canonical" href={domain} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      </head>
      <body>
        {/* Facebook Pixel removed */}
        <Providers>
          <ConditionalNavbar />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}