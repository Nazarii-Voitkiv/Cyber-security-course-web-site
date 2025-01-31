import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import FacebookPixel from '@/components/FacebookPixel';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin', 'cyrillic-ext'] });

export const metadata: Metadata = {
  title: 'Cyber Security Course',
  description: 'Курс з кібербезпеки',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <link
            rel="apple-touch-icon"
            href="/apple-touch-icon.png"
            type="image/png"
            sizes="180x180"
        />
      </head>
      <body className={inter.className}>
        <FacebookPixel/>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
