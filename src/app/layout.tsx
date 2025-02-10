import { Metadata } from 'next';
import './globals.css';
import FacebookPixel from '@/components/FacebookPixel';
import Providers from './providers';
import ConditionalNavbar from '@/components/ConditionalNavbar';

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
      <body>
        <FacebookPixel/>
        <Providers>
          <ConditionalNavbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}