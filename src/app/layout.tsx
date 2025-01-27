import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Курс з кібербезпеки',
  description: 'Навчіться захищати себе та свій бізнес від кіберзагроз',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
    <head>
        <script
            dangerouslySetInnerHTML={{
                __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];
            t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1790911841722624');
            fbq('track', 'PageView');
            `,
            }}
        />

        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <link
            rel="apple-touch-icon"
            href="/apple-touch-icon.png"
            type="image/png"
            sizes="180x180"
        />
    </head>
    <body className={inter.className}>
    {/*<FacebookPixel/>*/}
    <Navbar/>
    {children}
    </body>
    </html>
  );
}
