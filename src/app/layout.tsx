import { Metadata } from 'next';
import { Inter, Share_Tech_Mono } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { FB_PIXEL_ID } from '@/lib/fpixel';
import CyberBackground from '@/components/CyberBackground';
import CyberStyles from '@/components/CyberStyles';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });
const shareTechMono = Share_Tech_Mono({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-share-tech-mono'
});

export const metadata: Metadata = {
  title: 'Курс з кібербезпеки',
  description: 'Онлайн-курс з кібербезпеки - захистіть себе та свій бізнес від кіберзагроз',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} ${shareTechMono.variable} bg-gray-900 min-h-screen relative`}>
        <div className="cyber-lines" />
        <div className="cyber-glow" />
        <CyberBackground />
        <CyberStyles />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
